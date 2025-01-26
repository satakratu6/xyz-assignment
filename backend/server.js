const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/ques", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Load the protobuf
const PROTO_PATH = './questions.proto'; // Adjust the path if necessary
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const questionsProto = grpc.loadPackageDefinition(packageDefinition).questions;

// Define Question Schema
const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  anagramType: { type: String },
  blocks: [{ 
    text: { type: String, required: true },
    showInOption: { type: Boolean, default: true },
    isAnswer: { type: Boolean, default: false }
  }],
  siblingId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  options: [{ 
    text: { type: String, required: true },
    isCorrectAnswer: { type: Boolean, required: true }
  }]
});

const Question = mongoose.model("Question", questionSchema);

// gRPC Search Function
const searchQuestions = async (call, callback) => {
  const { title, page, limit } = call.request;

  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 10;

  const query = {};
  if (title) {
    query.title = { $regex: title, $options: "i" }; // Case-insensitive search
  }

  try {
    const totalQuestions = await Question.countDocuments(query);
    const questions = await Question.find(query)
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    callback(null, {
      questions: questions.map(q => ({
        id: q._id.toString(),
        title: q.title,
        description: q.description,
      })),
      current_page: currentPage,
      total_pages: Math.ceil(totalQuestions / itemsPerPage),
      total_questions: totalQuestions,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    callback({
      code: grpc.status.INTERNAL,
      details: "Internal server error"
    });
  }
};

// Create gRPC server
const server = new grpc.Server();
server.addService(questionsProto.QuestionService.service, { SearchQuestions: searchQuestions });

// Start the gRPC server
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('gRPC server running on http://localhost:50051');
  server.start();
});

// Start the Express server for REST API (if needed)
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
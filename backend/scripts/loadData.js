const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Question = require("../models/Question");  // Ensure this is the correct path

mongoose
  .connect("mongodb://localhost:27017/questions", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000,
    socketTimeoutMS: 60000
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const BATCH_SIZE = 1000; // Define the batch size (adjust based on your system's capacity)
const dataPath = path.join(__dirname, "../data/data.json");

const loadData = async () => {
  try {
    const rawData = fs.readFileSync(dataPath, "utf-8");  // Read the entire file content
    const jsonData = JSON.parse(rawData);

    let bulkOps = [];
    let counter = 0;

    // Process each document in the JSON data
    jsonData.forEach((doc) => {
      // Ensure the solution field is provided
      if (!doc.solution) {
        doc.solution = "Solution not provided"; // Set a default value for 'solution'
      }

      // Correctly convert _id if in '$oid' format
      if (doc._id && doc._id["$oid"]) {
        doc._id = new mongoose.Types.ObjectId(doc._id["$oid"]);
      }

      // Prepare the bulk operation
      bulkOps.push({
        insertOne: {
          document: doc,
        },
      });

      counter++;

      // Once the batch size is reached, execute the bulk write operation
      if (counter >= BATCH_SIZE) {
        processBatch(bulkOps);
        bulkOps = []; // Reset the bulkOps array after processing
        counter = 0;
      }
    });

    // Process remaining documents if any
    if (bulkOps.length > 0) {
      processBatch(bulkOps);
    }

    console.log("Data successfully loaded!");
  } catch (err) {
    console.error("Error loading data:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Function to handle bulk operations
const processBatch = async (bulkOps) => {
  try {
    await Question.bulkWrite(bulkOps);
    console.log(`${bulkOps.length} documents inserted.`);
  } catch (err) {
    console.error("Error during bulk write:", err);
  }
};

loadData();

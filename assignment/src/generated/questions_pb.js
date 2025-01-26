// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

import * as jspb from 'google-protobuf';

export const proto = {};
proto.questions = {};

// Question message
proto.questions.Question = class extends jspb.Message {
  constructor(data) {
    super();
    jspb.Message.initialize(this, data, 0, -1, null, null);
    this.id = '';
    this.title = '';
    this.description = '';
  }

  static toObject(includeInstance, msg) {
    const obj = {
      id: jspb.Message.getFieldWithDefault(msg, 1, ''),
      title: jspb.Message.getFieldWithDefault(msg, 2, ''),
      description: jspb.Message.getFieldWithDefault(msg, 3, ''),
    };
    if (includeInstance) obj.$jspbMessageInstance = msg;
    return obj;
  }

  static deserializeBinary(bytes) {
    const reader = new jspb.BinaryReader(bytes);
    const msg = new proto.questions.Question();
    return proto.questions.Question.deserializeBinaryFromReader(msg, reader);
  }

  static deserializeBinaryFromReader(msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;
      const field = reader.getFieldNumber();
      switch (field) {
        case 1:
          msg.id = reader.readString();
          break;
        case 2:
          msg.title = reader.readString();
          break;
        case 3:
          msg.description = reader.readString();
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  }

  serializeBinary() {
    const writer = new jspb.BinaryWriter();
    proto.questions.Question.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  static serializeBinaryToWriter(message, writer) {
    if (message.id) writer.writeString(1, message.id);
    if (message.title) writer.writeString(2, message.title);
    if (message.description) writer.writeString(3, message.description);
  }
};

// SearchRequest message
proto.questions.SearchRequest = class extends jspb.Message {
  constructor(data) {
    super();
    jspb.Message.initialize(this, data, 0, -1, null, null);
    this.title = '';
    this.page = 0;
    this.limit = 0;
  }

  static toObject(includeInstance, msg) {
    const obj = {
      title: jspb.Message.getFieldWithDefault(msg, 1, ''),
      page: jspb.Message.getFieldWithDefault(msg, 2, 0),
      limit: jspb.Message.getFieldWithDefault(msg, 3, 0),
    };
    if (includeInstance) obj.$jspbMessageInstance = msg;
    return obj;
  }

  static deserializeBinary(bytes) {
    const reader = new jspb.BinaryReader(bytes);
    const msg = new proto.questions.SearchRequest();
    return proto.questions.SearchRequest.deserializeBinaryFromReader(msg, reader);
  }

  static deserializeBinaryFromReader(msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;
      const field = reader.getFieldNumber();
      switch (field) {
        case 1:
          msg.title = reader.readString();
          break;
        case 2:
          msg.page = reader.readInt32();
          break;
        case 3:
          msg.limit = reader.readInt32();
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  }

  serializeBinary() {
    const writer = new jspb.BinaryWriter();
    proto.questions.SearchRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  static serializeBinaryToWriter(message, writer) {
    if (message.title) writer.writeString(1, message.title);
    if (message.page) writer.writeInt32(2, message.page);
    if (message.limit) writer.writeInt32(3, message.limit);
  }
};

// SearchResponse message
proto.questions.SearchResponse = class extends jspb.Message {
  constructor(data) {
    super();
    jspb.Message.initialize(this, data, 0, -1, proto.questions.SearchResponse.repeatedFields_, null);
    this.questions = [];
    this.current_page = 0;
    this.total_pages = 0;
    this.total_questions = 0;
  }

  static toObject(includeInstance, msg) {
    const obj = {
      questions: jspb.Message.toObjectList(
        msg.questions,
        proto.questions.Question.toObject,
        includeInstance
      ),
      current_page: jspb.Message.getFieldWithDefault(msg, 1, 0),
      total_pages: jspb.Message.getFieldWithDefault(msg, 2, 0),
      total_questions: jspb.Message.getFieldWithDefault(msg, 3, 0),
    };
    if (includeInstance) obj.$jspbMessageInstance = msg;
    return obj;
  }

  static deserializeBinary(bytes) {
    const reader = new jspb.BinaryReader(bytes);
    const msg = new proto.questions.SearchResponse();
    return proto.questions.SearchResponse.deserializeBinaryFromReader(msg, reader);
  }

  static deserializeBinaryFromReader(msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) break;
      const field = reader.getFieldNumber();
      switch (field) {
        case 1:
          const value = new proto.questions.Question();
          reader.readMessage(value, proto.questions.Question.deserializeBinaryFromReader);
          msg.questions.push(value);
          break;
        case 2:
          msg.current_page = reader.readInt32();
          break;
        case 3:
          msg.total_pages = reader.readInt32();
          break;
        case 4:
          msg.total_questions = reader.readInt32();
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  }

  serializeBinary() {
    const writer = new jspb.BinaryWriter();
    proto.questions.SearchResponse.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  static serializeBinaryToWriter(message, writer) {
    message.questions.forEach((question) => {
      writer.writeMessage(1, question, proto.questions.Question.serializeBinaryToWriter);
    });
    if (message.current_page !== 0) writer.writeInt32(2, message.current_page);
    if (message.total_pages !== 0) writer.writeInt32(3, message.total_pages);
    if (message.total_questions !== 0) writer.writeInt32(4, message.total_questions);
  }
};

export { proto };

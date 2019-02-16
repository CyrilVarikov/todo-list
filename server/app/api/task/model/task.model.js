const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true},
  deadLine: { type: Date, required: true},
  done: { type: Boolean },
  originalFileName: {type: String, default: null},
  serverFileName: {type: String, default: null},
  hasAttachment: {type: Boolean }
});

module.exports = mongoose.model('Task', TaskSchema);
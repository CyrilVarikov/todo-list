const Task = require('../model/task.model');
const ObjectId = require('mongoose').Types.ObjectId;

export function TaskService() {}

TaskService.addTask = data => {
  const task = new Task({
    heading: data.heading,
    description: data.description,
    deadLine: data.deadline,
    serverFileName: data.serverFileName,
    originalFileName: data.originalFileName,
    done: data.done || false,
    hasAttachment: data.hasAttachment || false
  });
  return task.save();
};

TaskService.getAll = () => {
  return Task.find({});
};

TaskService.deleteTaskById = id => {
  return Task.remove({_id: id});
};

TaskService.markAsDoneById = id => {
  return Task.updateOne({_id: id}, {
    $set: {
      done: true
    }
  })
};

TaskService.fetchById = id => {
  return Task.findOne({ _id: id })
};

TaskService.update = (id, mutable) => {
  return Task.updateOne({_id: id}, mutable);
};


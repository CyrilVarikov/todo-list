import { respond, handleError} from "../../../helpers/response.helper";
import { TaskService } from "../service/taskService";
import path from 'path';

export function getAllTasks(req, res) {
  return TaskService.getAll()
  .then(tasks => respond(res, 200)(tasks))
  .catch(err => handleError(res, 500)(err));
}

export function addTask(req, res) {
  const data = req.body;
  const file = req.file || null;
  
  if(file) {
    data.serverFileName = req.file.filename;
    data.originalFileName = req.file.originalname;
    data.hasAttachment = true;
  }
  
  return TaskService.addTask(data)
  .then(() => respond(res, 200)({message: 'Successfully'}))
  .catch(err => handleError(res, 500)(err));
}

export function deleteById(req, res) {
  const id = req.params.id;

  return TaskService.deleteTaskById(id)
  .then(() => respond(res, 200)({message: 'Successfully'}))
  .catch(err => handleError(res, 500)(err));
}

export function download(req, res) {
  const id = req.params.id;
  
  return TaskService.fetchById(id)
  .then(task => res.download(path.join('app','userfiles', task.serverFileName), task.originalFileName))
  .catch(err => handleError(res, 500)(err));
}

export function updateStatus(req, res) {
  const id = req.params.id;

  return TaskService.markAsDoneById(id)
  .then(() => respond(res, 200)({message: 'Success'}))
  .catch(err => handleError(res, 500)(err));
}

export function getTaskById(req, res) {
  const id = req.params.id;
  
  return TaskService.fetchById(id)
  .then(task => respond(res, 200)(task))
  .catch(err => handleError(res, 500)(err));
}

export function update(req, res) {
  const mutable = req.body;
  const id = req.params.id;
  const file = req.file || null;
  
  if(file) {
    mutable.serverFileName = req.file.filename;
    mutable.originalFileName = req.file.originalname;
    mutable.hasAttachment = true;
  }
  
  return TaskService.update(id, mutable)
  .then(() => respond(res, 200)({message: 'Successfully'}))
  .catch(err => handleError(res, 500)(err));
}
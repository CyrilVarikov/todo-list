import socketIO from 'socket.io';
import { TaskService } from './api/task/service/taskService';

exports.default = server => {
  const io = socketIO(server);
  
  io.on('connection', socket => {
    console.log('Successfully established socket connection');
  
    let previousId = null;

    const safeJoin = id => {
      socket.leave(previousId);
      socket.join(id);
      previousId = id;
    };
    
    socket.on('getTasks', () => {
      return TaskService.getAll()
      .then(tasks => socket.emit('tasks', tasks))
      .catch(err => socket.emit('tasks', err));
    });
    
    socket.on('getById', id => {
      safeJoin(id);
  
      return TaskService.fetchById(id)
      .then(task => socket.emit('getTask', task))
      .catch(err => socket.emit('getTask', err))
    });
  
  
    return TaskService.getAll()
    .then(tasks => io.emit('tasks', tasks))
    .catch(err => io.emit('tasks', err));
    
  });
};
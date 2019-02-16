import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TaskSocketService {
  public tasks = this.socket.fromEvent('tasks');
  public currentTask = this.socket.fromEvent('getTask');

  constructor(private socket: Socket) { }

  getTasks() {
    return this.socket.emit('getTasks');
  }

  updateTask(id) {
    return this.socket.emit('updateTask', id);
  }

  getById(id) {
    return this.socket.emit('getById', id);
  }


}

import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../service/task.service";
import {TaskSocketService} from "../../service/task.socket.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public tasks = null;
  constructor(private taskService: TaskService, private taskSocketService: TaskSocketService) {
  }

  ngOnInit() {
    this.taskSocketService.getTasks();
    return this.taskSocketService.tasks
    .subscribe(tasks => {
        return setTimeout(() => {
          this.tasks = tasks
        }, 500);
      },
      err => console.log('SOCKET ERROR', err));

    // this.taskService.getAllTasks()
    // .subscribe(tasks => this.tasks = tasks,
    //   err => console.error('Error:',err));
  }

  updateTasks() {
    console.log('TASKS');
    this.taskService.getAllTasks()
      .subscribe(tasks => this.tasks = tasks,
        err => console.error('Error:',err));
  }


}

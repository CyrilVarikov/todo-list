import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskService} from "../../service/task.service";
import FileSaver from 'file-saver';
import {Router} from "@angular/router";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
  @Input() task;
  @Output() sendReqToParent = new EventEmitter<string>();
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.task.deadLine = new Date(this.task.deadLine).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric'})
  }

  deleteTask(task) {
    return this.taskService.deleteById(task._id)
    .subscribe(msg => {
      console.log('MSG', msg);
      this.sendReqToParent.emit('success');
    },
      err => console.error('ERR', err));
  }

  changeStatus(task) {
    return this.taskService.updateStatusById(task._id)
    .subscribe(() => {
      task.done = true;
    })
  }

  downloadAttachment(id) {
    return this.taskService.downloadAttachments(id)
    .subscribe(file => {
        const blob = new Blob([file], {type: 'image/jpeg'});
        FileSaver.saveAs(blob, this.task.heading);
      },
      err => console.log('ERROR', err))
  }

  editTask(id) {
    return this.router.navigate(['/edit', id]);
  }
}

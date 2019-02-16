import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TaskService} from "../../service/task.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  private file = null;

  constructor(private taskService: TaskService, private router: Router) {
  }

  ngOnInit() {
  }

  public addTask(f: NgForm) {
    const formData = new FormData();
    const form = f.value;
    form.deadline = new Date(form.deadline.year, form.deadline.month - 1 , form.deadline.day).toLocaleString('en-US', {  year: 'numeric', month: 'numeric', day: 'numeric' });
    if(this.file) {
      formData.append('form-file', this.file, this.file.name);
    }
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    this.taskService.addTask(formData)
    .subscribe(() => this.router.navigate(['/home']),
      err => console.error(err));
  }

  public onChange(files) {
    this.file = files[0];
  }

}

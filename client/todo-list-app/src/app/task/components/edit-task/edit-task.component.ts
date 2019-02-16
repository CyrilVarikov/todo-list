import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../service/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskSocketService} from "../../service/task.socket.service";
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';

const TASK = gql`
  query task($id: String) {
    fetchById(id: $id) {
      _id
      heading
      description
      deadLine
      done
      hasAttachment
      originalFileName
      serverFileName
    }
  }
`;

const UPDATE_TASK = gql`
  mutation task($id: String, $heading: String, $deadLine: String, $description: String) {
    updateTask(id: $id, heading: $heading, deadLine: $deadLine, description: $description) {
      _id
      heading
      description
      deadLine
      done
      hasAttachment
      originalFileName
      serverFileName
    }
  }
`;

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  public task = null;
  private file = null;
  private query: QueryRef<any>;

  public datePicker = null;
  constructor(private taskService: TaskService, private taskSocketService: TaskSocketService,
              private router: Router, private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.query = this.apollo.watchQuery({
      query: TASK,
      variables: { id }
    });

    this.query.valueChanges.subscribe(result => {
      this.task = result.data.fetchById;
      const date = new Date(+this.task.deadLine);
      this.datePicker = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDay()
      };
    });
  }

  save() {
    this.task.deadline = new Date(this.datePicker.year, this.datePicker.month - 1 , this.datePicker.day).toLocaleString('en-US', {  year: 'numeric', month: 'numeric', day: 'numeric' });

    this.apollo.mutate({
      mutation: UPDATE_TASK,
      variables: {
        id: this.task._id,
        description: this.task.description,
        heading: this.task.heading,
        deadLine: this.task.deadLine
      }
    }).subscribe(res => {
      this.router.navigate(['/home']);
    });
  }

  public onChange(files) {
    this.file = files[0];
  }

  public back() {
    return this.router.navigate(['/home']);
  }


}

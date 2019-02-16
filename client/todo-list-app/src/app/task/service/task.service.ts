import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SERVER} from '../../../config/local.env.config';
import FileSaver from 'file-saver';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {
  }

  private BASE_URL: string = `${SERVER.protocol}${SERVER.origin}:${SERVER.port}/api/tasks`;

  public getAllTasks() {
    return this.http.get(`${this.BASE_URL}`);
  }

  public addTask(data) {
    return this.http.post(`${this.BASE_URL}/task`, data);
  }

  public deleteById(id) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }

  public updateStatusById(id) {
    return this.http.post(`${this.BASE_URL}/${id}/status`, {done: true});
  }

  public downloadAttachments(id) {
    return this.http.get(`${this.BASE_URL}/${id}/download`, {
      responseType: 'blob'
    });
  }

  public getById(id) {
    return this.http.get(`${this.BASE_URL}/${id}`)
  }

  public updateById(id, mutable) {
    return this.http.post(`${this.BASE_URL}/${id}/update`, mutable);

  }
}

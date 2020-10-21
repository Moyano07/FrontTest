import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public getTasksByProject(id:any) {
    return this.http.get(`get-tasks-by-project/${id}`);
  }

  create = (params) => this.http.post(`task/create`, params);

  update = (data) => this.http.post(`task/update`, data);

  delete = (params) => this.http.delete(`task/delete`,{params});
}

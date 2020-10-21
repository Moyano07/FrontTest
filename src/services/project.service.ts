import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  public getProject() {
    return this.http.get(`get-projects`);
  }

  create = (params) => this.http.post(`project/create`, params);

  update = (data) => this.http.post(`project/update`, data);

  delete = (params) => this.http.delete(`project/delete`,{params});

}

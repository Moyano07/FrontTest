import { Component, OnInit } from '@angular/core';
import { Observable,of,timer,Subject, merge   } from 'rxjs';
import {  switchMap, shareReplay,catchError,tap,delayWhen } from 'rxjs/operators';
import { TaskService } from 'src/services/task.service';
import { AuthService } from 'src/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$ :Observable<any>;
  onDeleteTask$$: Subject<FormGroup> = new Subject();

  projectId;
  loading:boolean =false;
  trackBy: (index: any, element: any) => any;

  constructor(private taskservice:TaskService,
    private router: ActivatedRoute,
    private authService:AuthService)  {

    this.trackBy = (index, element) => element.id;

   }

  ngOnInit(){
    this.projectId = this.router.snapshot.params.id;
    
    const deletedTask$ = this.onDeleteTask$$.pipe(
      this.deleteTask(),
    );

    this.tasks$ = merge(of({}), deletedTask$).pipe(
      tap(()=>this.loading =true),
      this.getTasks(),
      delayWhen(() => timer(2000)),
      tap(()=>this.loading =false)
  );
  }
  deleteTask(){
    return switchMap((id: any) => this.taskservice.delete({projectId:this.projectId,taskId:id}).pipe(
      catchError(_ => of(alert('Error delete'))
    ))
    );

  }

  getTasks = () =>{
    return switchMap(()=> this.taskservice.getTasksByProject(this.projectId).pipe(
      catchError(_ => of(alert('Error en peticion'))
    )))

  }

  logout(){
    this.authService.logout();
  }
  
  

}

import { Component, OnInit } from '@angular/core';
import { Observable,of,timer,Subject, merge   } from 'rxjs';
import {  switchMap, shareReplay,catchError,tap,delayWhen } from 'rxjs/operators';
import { ProjectService } from 'src/services/project.service';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  resourceProjects$ :Observable<any>;
  loading:boolean =false;
  trackBy: (index: any, element: any) => any;
  projects$ :Observable<any>;
  onDeleteProject$$: Subject<FormGroup> = new Subject();

  constructor(private projectservice:ProjectService,
    private authService:AuthService)  {

    this.trackBy = (index, element) => element.id;

   }

  ngOnInit(){
    

    const deletedProject$ = this.onDeleteProject$$.pipe(
      this.deleteTask(),
    );

    this.resourceProjects$ = merge(of({}), deletedProject$).pipe(
      tap(()=>this.loading =true),
      this.getProjects(),
      delayWhen(() => timer(2000)),
      tap(()=>this.loading =false)
  );
  }

  deleteTask(){
    return switchMap((id: any) => this.projectservice.delete({projectId:id}).pipe(
      catchError(_ => of(alert('Error delete'))
    ))
    );

  }

  getProjects = ()=>{
    return switchMap(()=> this.projectservice.getProject().pipe(
      catchError(_ => of(alert('Error en peticion'))
    ))
    )
  }

  logout(){
    this.authService.logout();
  }
  
  

}

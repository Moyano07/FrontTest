import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl,Validators,FormBuilder } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { map, switchMap,catchError,tap, filter } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.scss']
})
export class CreateTasksComponent implements OnInit {
  projectId;
  taskId
  public form: FormGroup;
  public onSubmit$: Subject<FormGroup> = new Subject();
  loading:boolean =false;


  constructor(private taskService:TaskService,
    private activeRouter: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router, 
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.projectId = this.activeRouter.snapshot.params.projectId;
    
    
    /* this.activeRouter.params.pipe(pluck('proyectId')).subscribe(async (proyectId: string) => {
      this.proyectId = groupUuid;
    }); */
    this.initForm();

    this.onSubmit$
    .pipe(
      this.processForm$(),
      tap(()=>this.loading =true),
      map((form: FormGroup) => this.getFormData(form)),
      switchMap((formData) =>this.taskService.create(formData).pipe(
        catchError(_ => of(null)
      ))),
      tap(()=>this.loading =false),
    )
    .subscribe(
      success => success ? this.router.navigate(['/project/tasks',this.projectId]) : null
    );
  
  }
  sendForm$ = (formData) => {
    return switchMap((formData) =>this.taskService.create(formData).pipe(
      catchError(_ => of(null)
    )));
  };
  

  logout(){
    this.authService.logout();
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  public processForm$() {
    return switchMap((formGroup: FormGroup) =>
      of(formGroup).pipe(
        tap(form => {
          if (form.valid) {
            return;
          }
          form.markAllAsTouched();
          //
          if (form.get('data')) {
            form.get('data').markAllAsTouched();
          }
          this.loading =false;
        }),
        filter(form => form.valid),
        map(form => form.value)
      )
    );
  }

  getFormData = (form: FormGroup) => {
    const formData = new FormData();
    formData.set('projectId',this.projectId);
    for (const [key, value] of Object.entries(form)) {
      
      formData.set(key, value);
    }
    

    return formData;
  };
  
 
}

import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Rxjs
import { Subject, of } from 'rxjs';


// Services
import { AuthService } from 'src/services/auth.service';
import { map, switchMap,catchError,tap, filter } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loading:boolean =false;
  constructor( 
    private fb: FormBuilder,  
    private router: Router,
    private authService: AuthService,
  ) {
  }

  public onSubmit$: Subject<FormGroup> = new Subject();

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
    
  

  sendForm$ = (formData: FormData) => {
    return this.authService.login(formData);
  };

  
  ngOnInit() {
  this.onSubmit$
      .pipe(
        
        this.processForm$(),
        tap(()=>this.loading =true),
        map((form: FormGroup) => this.getFormData(form)),
        switchMap((formData) => this.sendForm$(formData).pipe(catchError((error) => of({ error })))),
        tap(()=>this.loading =false),
      )
      .subscribe(
        success => success ? this.router.navigate(['/home']) : null
      );
    }

    getFormData = (form: FormGroup) => {
      const formData = new FormData();
      
      for (const [key, value] of Object.entries(form)) {
        if (value !== undefined) {
          formData.append(key, value);
          continue;
        }
        
        formData.set(key, value);
      }
  
      return formData;
    };

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
            //alert('ALERT.INVALID_FORM');
          }),
          filter(form => form.valid),
          map(form => form.value)
        )
      );
    }
  }

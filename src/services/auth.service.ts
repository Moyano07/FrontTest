import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Rxjs
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) { }

  public login(formData: any) {
    return this.http.post('login', formData).pipe(
      tap(({ token }: any) => localStorage.setItem('[test] token', token)),
    );
  }

  

  getPermissions(): any {
    return this.http.get(`/authorization/list`);
  }

  public logout = () => {
    localStorage.clear();
    this.isLoggedIn.next(false);
    this.router.navigate(['/', 'auth', 'login']);
  };

  
}

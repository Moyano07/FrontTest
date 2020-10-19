import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate() {
    if (localStorage.getItem('[test] token')) {
      return true;
    }

    this.auth.isLoggedIn.next(false);
    console.log('asdasdasd');
    
    this.router.navigate(['/', 'auth', 'login']);
    return false;
  }
}

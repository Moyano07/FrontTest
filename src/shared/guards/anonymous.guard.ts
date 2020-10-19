import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (!localStorage.getItem('[test] token')) {
      return true;
    }
    console.log('asdas');
    
    this.router.navigate(['/auth/login']);
    return false;
  }
}

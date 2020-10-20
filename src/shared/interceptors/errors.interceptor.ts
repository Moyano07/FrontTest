import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

// Rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 200) {
          return;
        }
        if (err.status === 404) {
          alert('This endpoint does not exists: ' + request.url);
        }

        if (err.status === 401) {
          this.authService.logout();
        }

        const error = err.error.message || err.error.detail || err.error;
        alert( 'Ups...'+err.error.message);

        return throwError({ status: err.status, message: error });
      })
    );
  }
}

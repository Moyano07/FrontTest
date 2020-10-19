import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

// Rxjs
import { Observable } from 'rxjs';

// ENV
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const includeAssets = request.url.includes('assets');

    if (!includeAssets) {
      request = request.clone({
        url: `${environment.baseUrl}/${request.url}`
      });
    }

    return next.handle(request);
  }
}

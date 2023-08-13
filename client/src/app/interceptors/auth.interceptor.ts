import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service'; 

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.sessionService.getToken();
    
    if (token) {
      request = request.clone({
        setHeaders: {
          'X-Authorization': token.accessToken,
        }
      });
    }

    request = request.clone({
      setHeaders: {
        'enctype': 'multipart/form-data'
      }
    });

    request = request.clone({
      withCredentials: true
    });

    return next.handle(request);
  }
}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment.prod";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    request = request.clone({headers: request.headers.set('Accept', 'application/json')});
    request = request.clone({headers: request.headers.delete('Content-Type', 'application/json')});
    request = request.clone({setHeaders: {'Content-Type': 'application/json'}});
    request = request.clone({url: environment.baseURL + request.url});

    return next.handle(request);
  }
}

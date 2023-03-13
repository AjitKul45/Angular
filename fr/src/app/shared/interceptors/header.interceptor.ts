import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('in headers intercept');
    if (request.headers.has('content-type')) {
      console.log(request.headers.get('content-type'));
      return next.handle(request);
    }

    console.log('Request has no content-type');

    request = request.clone({
      headers: request.headers.set('content-type', 'application/json'),
    });
    return next.handle(request);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorObj = { statusCode: Number, message: String };
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
        } else {
          console.log(error);
          console.log('This is server side error');
          errorObj.statusCode = error.error.status;
          errorObj.message = error.error;
        }
        return throwError(errorObj);
      })
    );
  }
}

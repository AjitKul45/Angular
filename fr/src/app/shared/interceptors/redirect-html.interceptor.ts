import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RedirectHtmlInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  error: any = {};
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status == 403) {
          this.router.navigate(['/dashboard']);
          let errormsg = err.message;
          return throwError({
            errormsg,
          });
        }
        return throwError({
          err,
        });
      })
    );
  }
}

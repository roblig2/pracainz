import {catchError, Observable, tap} from "rxjs";
import {HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {ErrorDialogComponent} from "../error-dialog/error-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {inject} from "@angular/core";

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const dialog = inject(MatDialog)
  return next(req).pipe(
    catchError((err:HttpErrorResponse)=>{
    if (err.status===500) {
      dialog.open(ErrorDialogComponent);
    }
      throw err;
    })
);
}

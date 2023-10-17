import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleHttpError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return 'Client side error: ' + error.error.message;
    } else {
      console.error(`Código de error ${error.status}, mensaje: ${error.error}`);
      return 'An error occurred on the server. Please try again later.';
    }
  }
}

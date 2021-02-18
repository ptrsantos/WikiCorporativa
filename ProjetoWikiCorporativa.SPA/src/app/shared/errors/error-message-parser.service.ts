import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorParserService {

  
  constructor() { }

  getErrorMessage(err: any): string {
      if (!err.error) return '';

      if (err.error.Message) return err.error.Message;
      if (err.error.message) return err.error.message;

      if (err instanceof HttpErrorResponse) {

          switch (err.status) {
              case 0:
                  return 'O servidor encontra-se indisponível!!!<br>Por favor, tente novamente dentro de alguns instantes';
              case 401:
              case 403:
                  return 'Você não tem acesso a URL solicitada';
              case 405:
                  return `O método chamado ${err.url} não existe`;
              default:
                  if (err.status != 400) {
                      console.log(err)
                      return err.message;
                  }
          }
      }

      if (err.error && !(err.error instanceof ProgressEvent)) return err.error;

      return '';
  }

}

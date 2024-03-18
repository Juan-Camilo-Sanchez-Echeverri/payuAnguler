import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  configUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  payUBuy(url: string) {
    return this.http.post<any>(`http://localhost:5000/${url}`, {}).pipe(
      catchError((error) => {
        // Aquí puedes manejar el error como prefieras
        // Por ejemplo, puedes mostrar un mensaje de error en la consola
        alert('Ha ocurrido un error:' + error.message);
        // Y luego, puedes re-lanzar el error para que pueda ser manejado por cualquier suscriptor
        return throwError(error);
      })
    );
  }
}

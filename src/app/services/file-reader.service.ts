import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor(private http: HttpClient) { }

  // Lee el archivo .txt desde la carpeta assets
  readTextFile(filePath: string): Observable<string | null> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      catchError(() => of(null)) // Devuelve null si el archivo no existe
    );
  }

}
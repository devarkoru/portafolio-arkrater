import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://mail-sender-api1.p.rapidapi.com/'; // URL de la API

  constructor(private http: HttpClient) {}

  sendEmail(emailData: any): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': 'e4e7671444mshd78f02c10d43aaep13fd66jsn6cd6dc3d5f2d', // tu API key
      'x-rapidapi-host': 'mail-sender-api1.p.rapidapi.com',
      'Content-Type': 'application/json',
    });

    const body = {
      sendto: emailData.sendto,
      name: emailData.name,
      replyTo: emailData.replyTo,
      ishtml: emailData.ishtml,
      title: emailData.title,
      body: emailData.body,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}


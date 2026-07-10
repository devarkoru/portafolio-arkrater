import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://mail-sender-api1.p.rapidapi.com/'; // URL de la API

  constructor(private http: HttpClient) {}

  sendEmail(emailData: any): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': environment.rapidApiKey,
      'x-rapidapi-host': environment.rapidApiHost,
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


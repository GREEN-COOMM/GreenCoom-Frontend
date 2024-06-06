import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8080/api/v1/events'; // Ajusta la URL de tu API

  constructor(private http: HttpClient) { }

  createEvent(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token'); // O desde donde almacenes tu token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, formData, { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:8002/api/event/create';
  private apiUrl1 = 'http://localhost:8002/api/event/list';

  constructor(private http: HttpClient, private authService: AuthService) { }

  listarEventos(): Observable<any[]>{
    const token = this.authService.getToken();
    console.log("Tken obtenido correctamente: ", token)
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);


    console.log(`Bearer ${token}`);
    console.log("Listo para enviar token")
    console.log(headers)
    return this.http.get<any[]>(this.apiUrl1, { headers });
  }

  createEvent(eventRequest: any): Observable<any> {
    const token = localStorage.getItem('token'); // O desde donde almacenes tu token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, eventRequest, { headers });
  }
}

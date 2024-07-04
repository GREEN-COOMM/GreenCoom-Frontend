import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private apiUrl1 = 'https://api-gateway-m.onrender.com/publication/list'
  private apiUrl2 = 'https://api-gateway-m.onrender.com/publication/create'; 

  constructor( private http: HttpClient, private authService: AuthService) { }

  listarPublicaciones(): Observable<any[]>{
    const token = this.authService.getToken();
    console.log("TOken obtenido correctamente: ", token)
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);


    console.log(`Bearer ${token}`);
    console.log("Listo para enviar token")
    console.log(headers)
    return this.http.get<any[]>(this.apiUrl1, { headers }).pipe(
  );
  }

  createPublication(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token'); // O desde donde almacenes tu token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Hasta aca todo bien");
    return this.http.post(this.apiUrl2, formData, { headers, responseType: 'text' });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private apiUrl = 'http://localhost:3001/publicaciones';

  constructor(private http: HttpClient) {}

  obtenerPublicaciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearPublicacion(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, formData, { headers });
  }
}
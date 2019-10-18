import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://techconnective.azurewebsites.net/api/usuario';

  constructor(private http: HttpClient) { }

  obterPorNome(id: any): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  cadastrarUsuario(User: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/criar`, User);
  }

  updateUsuario(id: any, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
}

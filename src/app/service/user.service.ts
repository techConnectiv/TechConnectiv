import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'https://techconn.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  obterPorNome(id: any): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  cadastrarUsuario(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/usuario/criar`, user);
  }

  updateUsuario(id: any, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  empresaCriar(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`+ `/empresa/criar`, user); 
  }
}

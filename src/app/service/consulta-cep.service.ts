import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(
    private http: HttpClient
  ) { }

  consultaCep(cep: string) {

    /* let cep = this.firstFormEmpresa.get('endereco.cep').value; */
    cep = cep.replace(/\d/g, '');

    if (cep !== '') {

      const validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {

        return this.http.get(`//viacep.com.br/ws/${cep}/json`);

      }
    }
    return of({});

  }

}

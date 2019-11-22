import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  @Output()
  event: EventEmitter<any> = new EventEmitter<any>(true);

  private baseUrl = 'https://techconn.herokuapp.com/api';
  private local = 'http://localhost:8080/api';


  constructor(
    private router: Router,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private loadingService: LoadingService
  ) { }

  authenticate: boolean = false;
  isAuth = new EventEmitter<boolean>();
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json', 'responseType': 'text'
  });

  getAll() {
    this.loadingService.show();
    
    return this.http.get(`${this.local}/ong/list`);
/*     .pipe(
      map(data => {
        console.log('Data', data)
        
          return data; //|| {};

        })
      ) */
  }

  cadastrarUsuario(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/usuario/criar`, user, { headers: this.headers });
  }

  updateUsuario(id: any, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  empresaCriar(form) {
    return this.http.post(`${this.local}` + `/empresa/criar`, form);
  }

  login(login: string, senha: string): Observable<Object> {
    return this.http.post(`${this.local}/login/usuario`, { login, senha }, { headers: this.headers })
      .pipe(map(user => {
        if (user) {
          this.authenticate = true;

          this.snackbar.open('Redirecionando, aguarde...', 'Fechar', {
            duration: 2000
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
            this.isAuth.emit(true);
          }, 2000)
        } else {
          this.snackbar.open('Login ou senha inválidos...', 'Fechar',{
            duration: 2000
          });
          this.authenticate = false;
          this.isAuth.emit(false);
        }
        return user;
      }));

  }

  logout() {
    this.router.navigate(['/login']);
  }

  userAuthenticate() {
    return this.authenticate;
  }
}

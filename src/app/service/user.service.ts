import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { Injectable, Output, EventEmitter, Directive } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Directive()
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

    return this.http.get(`${this.baseUrl}/ong/list`)
      .pipe(
        map(data => {

          return data || {};

        })
      );
  }

  cadastrarUsuario(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/usuario/criar`, user, { headers: this.headers });
  }

  updateUsuario(id: any, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  empresaCriar(form): Observable<any> {
    return this.http.post(`${this.baseUrl}/empresa/criar`, form);

  }

  ongCriar(form): Observable<any> {
    return this.http.post(`${this.baseUrl}/ong/criar`, form);

  }

  doar(doacao: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/doacao/criar`, doacao);
  }

  login(login: string, senha: string): Observable<Object> {
    return this.http.post(`${this.baseUrl}/login/usuario`, { login, senha }, { headers: this.headers })
      .pipe(map(user => {
        if (user) {
          this.authenticate = true;

          this.snackbar.open('Redirecionando, aguarde...', 'Fechar', {
            duration: 1000
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
            this.isAuth.emit(true);
          }, 1000)
        } else {
          this.snackbar.open('Login ou senha inválidos...', 'Fechar', {
            duration: 2000
          });
          this.authenticate = false;
          this.isAuth.emit(false);
        }
        return user;
      }));

  }

  logout() {
    this.snackbar.open('Saindo...', 'Fechar', {
      duration: 500
    });
    setTimeout(() => {
      this.router.navigate(['/login']);
      this.authenticate = false;
      this.isAuth.emit(false);
    }, 500);
  }

  listaDoacao() {
    return this.http.get(`${this.baseUrl}/doacao/list`)
      .pipe(map(data => {
        return data || {};
      })
      );
  }

  userAuthenticate() {
    return this.authenticate;
  }

  listPage(page: number = 0, linesPerPage: number = 5) {
    return this.http.get(`${this.baseUrl}/doacao/page?page=${page}&linesPerPage=${linesPerPage}`);
  }
}

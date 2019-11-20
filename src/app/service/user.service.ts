import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { User } from './../login/usuario';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  @Output()
  event: EventEmitter<any> = new EventEmitter<any>(true);

  private baseUrl = 'https://techconn.herokuapp.com/api';
  private local = 'http://localhost:8080/api';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingService: LoadingService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json', 'responseType': 'text'
  });

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getAll() {
    
    this.loadingService.show();

    this.http.get(`${this.local}/list`)
      .pipe(
        tap((data: any) => {

          return data || {};

        }),
        catchError(error => {

          this.loadingService.hide();

          this.event.emit({ "erro": error });

          return throwError(error)

        })
      ).subscribe(resp => {

        this.loadingService.hide();

        this.event.emit(resp);

      });
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

  login(login: string, senha: string):Observable<string> {
    return this.http.post<string>(`${this.local}/login/usuario`, { login, senha })
  }

  logout() {
    this.router.navigate(['/login']);
  }
}

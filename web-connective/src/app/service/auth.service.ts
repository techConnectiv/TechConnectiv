import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../login/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: boolean = false;

  isAuth = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  login(usuario: Usuario){
    if(usuario.nome === 'danilo.jesus' && usuario.senha === 'Dan25856252'){
      this.user = true;
      this.isAuth.emit(true);
      this.router.navigate(['/home']);
    }else {
      this.user = false
      this.isAuth.emit(false);
    }
  }
}

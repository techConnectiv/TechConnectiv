import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../login/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAutenticate: boolean = false;

  authEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  login(usuario: Usuario){
    
    if(usuario.nome === 'danilo.jesus' && usuario.senha === 'Dan25856252'){
      this.userAutenticate = true;
      this.authEmitter.emit(true);
      this.router.navigate(['/home']);
    }else {
      this.userAutenticate = false
      this.authEmitter.emit(false);
    }
  }

  logoff(){
    this.userAutenticate = false;
    this.authEmitter.emit(false);
    this.router.navigate(["/index"]);
  }

  Autenticate(){
    return this.userAutenticate
  }
}

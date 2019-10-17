import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    //console.log(this.usuario);
    this.authService.login(this.usuario);
  }

}

import { CustomerService } from './service/user.service';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Input()
  color: ThemePalette

  title = 'techConnective';

  isAuth: boolean = false;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.customerService.isAuth.subscribe(
      isAuth => this.isAuth = isAuth
    );
  }

}

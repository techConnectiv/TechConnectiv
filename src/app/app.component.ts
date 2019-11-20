import { CustomerService } from './service/user.service';
import { User } from './login/usuario';
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

  currentUser: User;

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customerService.currentUser.subscribe(x => this.currentUser = x);
  }

/*   logout() {
    this.customerService.logout();
    this.router.navigate(['/login']);
  } */
}

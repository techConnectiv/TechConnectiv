import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'techConnective';

  mostrar: boolean = false
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.authService.authEmitter.subscribe(
      isAuth => this.mostrar = isAuth
    );
  }

  ngOnDestroy() {
    this.authService.logoff();
  }
}

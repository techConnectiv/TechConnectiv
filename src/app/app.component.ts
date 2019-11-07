import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { AuthService } from './service/auth.service';
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

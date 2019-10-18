import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'techConnective';

  mostrar: boolean = false
  constructor(private authService: AuthService) {
    
  }

  ngOnInit(){
    this.authService.authEmitter.subscribe(
      isAuth => this.mostrar = isAuth
    );
  }
}

import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'techConnective';

  constructor() {
    setTheme('bs3'); // or 'bs4'
  }
}

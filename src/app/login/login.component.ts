import { CustomerService } from './../service/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private customerService: CustomerService
  ) { }




  ngOnInit() {

    this.loginUser = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }
  get f() { return this.loginUser.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginUser.invalid) {
      return;
    }

    this.loading = true;
    this.customerService.login(this.f.login.value, this.f.senha.value)
      .subscribe(
        data => {
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.snackbar.open('Login ou senha inválidos...', 'Fechar', {
            duration: 2000
          });
        });
  }
}

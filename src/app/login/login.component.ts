import { CustomerService } from './../service/user.service';
import { AlertService } from './../service/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private customerService: CustomerService
  ) {
    if (this.customerService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }




  ngOnInit() {

    this.loginUser = this.fb.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

  }
  get f() { return this.loginUser.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginUser.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.loginUser.value)
    
   /*  this.customerService.login(this.f.login.value, this.f.senha.value)
      .subscribe(
        data => {

          this.router.navigate([this.returnUrl])

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  } */
  this.customerService.login(this.f.login.value, this.f.senha.value).subscribe(data => console.log(data))
}
}

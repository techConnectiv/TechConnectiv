import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Estados } from './../model/estados';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CustomerService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Sexo {
  viewValue: string;
}

declare var $: any;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  sexo: Sexo[] = [
    { viewValue: 'M' },
    { viewValue: 'F' },
    { viewValue: 'Outros' }
  ];

  firstFormEmpresa: FormGroup;
  firstFormDoador: FormGroup;
  firstFormOng: FormGroup;

  isOptional = false;

  celular = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  telefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cnpj = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cpf = [/[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  data = [/[1-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];



  constructor(
    private _formBuilder: FormBuilder,
    private customer: CustomerService,
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private router: Router

  ) { }

  ngOnInit() {

    this.formDoador();
    this.formEmpresa();
    this.formOng();
    this.jQuery();

    console.log(this.firstFormEmpresa.get("endereco.cep"));
  }

  formEmpresa() {
    this.firstFormEmpresa = this._formBuilder.group({

      nomeEmpresa: ['', Validators.required],
      razaoSocial: [''],
      cnpj: ['', Validators.required],
      credenciais: this._formBuilder.group({
        login: ['', [
          Validators.required,
          Validators.email,
        ]],
        senha: ['', Validators.required]
      }),
      repeteSenha: ['', Validators.required],
      endereco: this._formBuilder.group({
        cep: ['', Validators.required],
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        uf: ['', Validators.required],
        cidade: ['', Validators.required],
        bairro: ['', Validators.required],
        complemento: [''],
        referencia: ['']
      }),
      contato: this._formBuilder.group({
        telefone: ['', Validators.required],
        celular: ['', Validators.required],
        email: ['', [
          Validators.required,
          Validators.email,
        ]]
      })
    })
  }

  formDoador() {
    this.firstFormDoador = this._formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      sex: ['', Validators.required],
      credenciais: this._formBuilder.group({
        login: ['', [
          Validators.required,
          Validators.email,
        ]],
        senha: ['', Validators.required]
      }),
      repeteSenha: ['', Validators.required],
      endereco: this._formBuilder.group({
        cep: [''],
        rua: [''],
        numero: [''],
        uf: [''],
        cidade: [''],
        bairro: [''],
        complemento: [''],
        referencia: ['']
      }),
      contato: this._formBuilder.group({
        telefone: [''],
        celular: [''],
        email: ['', [
          Validators.required,
          Validators.email,
        ]]
      })
    })
  }

  formOng() {
    this.firstFormOng = this._formBuilder.group({
      nomeInstituicao: ['', Validators.required],
      cnpj: ['', Validators.required],
      credenciais: this._formBuilder.group({
        login: ['', [
          Validators.required,
          Validators.email,
        ]],
        senha: ['', Validators.required]
      }),
      repeteSenha: ['', Validators.required],
      endereco: this._formBuilder.group({
        cep: [''],
        rua: [''],
        numero: [''],
        uf: [''],
        cidade: [''],
        bairro: [''],
        complemento: [''],
        referencia: ['']
      }),
      contato: this._formBuilder.group({
        telefone: [''],
        celular: [''],
        email: ['', [
          Validators.required,
          Validators.email,
        ]]
      })
    })
  }


  onSubmit(f: NgForm) {

    if (this.firstFormEmpresa.valid) {

      this.customer.empresaCriar(this.firstFormEmpresa.value);

      this.snackbar.open('Empresa cadastrada com sucesso...', 'Fechar', {
        duration: 2000
      });

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);

    } else {
      this.snackbar.open('Certifique-se de preencher todos os campos com *', 'Fechar', {
        duration: 2000
      });
      return;
    }

  }

  doadorSubmit(d: NgForm) {

    if (this.firstFormDoador.valid) {

      this.customer.cadastrarUsuario(this.firstFormDoador.value);

      this.snackbar.open('Usuario cadastrado com sucesso...', 'Fechar', {
        duration: 2000
      });

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);

    } else {
      this.snackbar.open('Certifique-se de preencher todos os campos com *', 'Fechar', {
        duration: 2000
      });
      return;
    }
  }

  ongSubmit(o: NgForm) {

    if (this.firstFormOng.valid) {

      this.customer.ongCriar(this.firstFormOng.value);
      this.snackbar.open('Instituição cadastrada com sucesso...', 'Fechar', {
        duration: 2000
      });

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);

    } else {
      this.snackbar.open('Certifique-se de preencher todos os campos com *', 'Fechar', {
        duration: 2000
      });
      return;
    }

  }

  jQuery() {
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $(".next").click(function () {
      if (animating) return false;
      animating = true;

      current_fs = $(this).parent();
      next_fs = $(this).parent().next();

      //activate next step on progressbar using the index of next_fs
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = (now * 50) + "%";
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({
            'transform': 'scale(' + scale + ')',
            'position': 'absolute'
          });
          next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      });
    });

    $(".previous").click(function () {
      if (animating) return false;
      animating = true;

      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();

      //de-activate current step on progressbar
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

      //show the previous fieldset
      previous_fs.show();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale previous_fs from 80% to 100%
          scale = 0.8 + (1 - now) * 0.2;
          //2. take current_fs to the right(50%) - from 0%
          left = ((1 - now) * 50) + "%";
          //3. increase opacity of previous_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({ 'left': left });
          previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      });
    });

    $(".submit").click(function () {
      return false;
    })

  }

  consultaCep(cep, form) {
    if (cep != '') {

      let validaCep = /^[0-9]{8}$/;

      if (validaCep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .pipe(map(dados => dados))
          .subscribe(dados => this.populaDados(dados, form));
      }
    }

  }

  populaDados(dados, form) {
    form.form.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        numero: '',
        uf: dados.uf,
        cidade: dados.localidade,
        bairro: dados.bairro,
        complemento: dados.complemento,
        referencia: ''
      }
    });
    console.log(dados.uf);

  }
}

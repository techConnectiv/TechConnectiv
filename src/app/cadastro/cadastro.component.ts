import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CustomerService } from '../service/user.service';
import { MatSnackBar } from '@angular/material';

export interface Sexo {
  viewValue: string
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

  states: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public cpfMask = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];

  firstFormEmpresa: FormGroup;
  firstFormDoador: FormGroup;
  firstFormOng: FormGroup;

  isOptional = false;

  constructor(
    private _formBuilder: FormBuilder,
    private customer: CustomerService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.formDoador();
    this.formEmpresa();
    this.formOng();
    this.jQuery();
  }

  formEmpresa() {
    this.firstFormEmpresa = this._formBuilder.group({

      nomeEmpresa: ['askh', Validators.required],
      razaoSocial: ['assd'],
      cnpj: ['asddasdas', Validators.required],
      credenciais: this._formBuilder.group({
        login: ['asdasdas', [
          Validators.required,
          Validators.email,
        ]],
        senha: ['sadasdasd', Validators.required]
      }),
      repeteSenha: ['asdasd', Validators.required],
      endereco: this._formBuilder.group({
        cep: ['asdasd', Validators.required],
        rua: ['asdasds', Validators.required],
        numero: ['adasdasd', Validators.required],
        uf: ['sadsa', Validators.required],
        cidade: ['sadas', Validators.required],
        bairro: ['asdasd', Validators.required],
        complemento: ['asdsad'],
        referencia: ['asdas']
      }),
      contato: this._formBuilder.group({
        telefone: ['asdsad', Validators.required],
        celular: ['asdasd', Validators.required],
        email: ['asdasda', [
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

     this.customer.empresaCriar(this.firstFormEmpresa.value)
      .subscribe(
        data =>
          //this.openSnackBar(),
          console.log(data),
        error => console.log('Erro!', error),
      ) 
      
      
  }

  doadorSubmit(d: NgForm) {

    this.customer.cadastrarUsuario(this.firstFormDoador.value)
      .subscribe(
        data =>
          this.openSnackBar(),
        error => console.log('Erro!', error),
      )
  }

  ongSubmit(o: NgForm) {

    this.customer.empresaCriar(this.firstFormOng.value)
      .subscribe(
        data =>
          this.openSnackBar(),
        error => console.log('Erro!', error),
      )
  }

  openSnackBar() {
    this._snackBar.open('Cadastrado com sucesso!', 'Fechar', {
      duration: 3000
    });
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
}

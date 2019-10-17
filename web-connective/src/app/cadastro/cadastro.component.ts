import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { $ } from 'protractor';

export interface Sexo {
  viewValue: string;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  sexo: Sexo[] = [
    {viewValue: 'M'},
    {viewValue: 'F'}
  ];

  states: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
    'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];
  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  firstFormEmpresa: FormGroup;
  secondFormEmpresa: FormGroup;
  thirthFormEmpresa: FormGroup;

  firstFormDoador: FormGroup;
  secondFormDoador: FormGroup;
  thirthFormDoador: FormGroup;

  firstFormOng: FormGroup;
  secondFormOng: FormGroup;
  thirthFormOng: FormGroup;
  
  isOptional = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
  this.formDoador();
  this.formEmpresa();
  this.formOng();
  }
formEmpresa(){
  this.firstFormEmpresa = this._formBuilder.group({
    nomeEmpresa: ['', Validators.required],
    razaoSocial: [''],
    cnpj: ['', Validators.required],
    senha: ['', Validators.required],
    repeteSenha: ['', Validators.required]
  });
  this.secondFormEmpresa = this._formBuilder.group({
      cep: [''],
      rua: [''],
      numero: [''],
      cidade: [''],
      bairro: [''],
      complemento: [''],
      referencia: ['']
  });
  this.thirthFormEmpresa = this._formBuilder.group({
    telefone: [''],
    celular: [''],
    site: ['']
});
}

formDoador() {
  this.firstFormDoador = this._formBuilder.group({
    nome: ['', Validators.required],
    cpf: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    sex: ['', Validators.required],
    senha: ['', Validators.required],
    repeteSenha: ['', Validators.required]
  });
  this.secondFormDoador = this._formBuilder.group({
      cep: [''],
      rua: [''],
      numero: [''],
      cidade: [''],
      bairro: [''],
      complemento: [''],
      referencia: ['']
  });
  this.thirthFormDoador = this._formBuilder.group({
    telefone: [''],
    celular: [''],
    email: ['']
});
}

formOng(){
  this.firstFormOng = this._formBuilder.group({
    nomeInstituicao: ['', Validators.required],
    cnpj: ['', Validators.required],
    senha: ['', Validators.required],
    repeteSenha: ['', Validators.required]
  });
  this.secondFormOng = this._formBuilder.group({
      cep: [''],
      rua: [''],
      numero: [''],
      cidade: [''],
      bairro: [''],
      complemento: [''],
      referencia: ['']
  });
  this.thirthFormOng = this._formBuilder.group({
    telefone: [''],
    celular: [''],
    site: [''],
    email: ['', [
      Validators.required,
      Validators.email,
    ]]
});
}
  onSubmit() {

  }
}

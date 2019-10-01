import { ComumComponent } from './cadastro/comum/comum.component';
import { EmpresaComponent } from './cadastro/empresa/empresa.component';
import { OngComponent } from './cadastro/ong/ong.component';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { DoubtsComponent } from './doubts/doubts.component';
import { BiografiaComponent } from './biografia/biografia.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'biography', component: BiografiaComponent },
  { path: 'doubts', component: DoubtsComponent },
  { path: 'info', component: InfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ong', component: OngComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'comum', component: ComumComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

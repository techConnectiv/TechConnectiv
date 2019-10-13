import { EstaticoComponent } from './estatico/estatico.component';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { DoubtsComponent } from './doubts/doubts.component';
import { BiografiaComponent } from './biografia/biografia.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'biography', component: BiografiaComponent },
  { path: 'doubts', component: DoubtsComponent },
  { path: 'info', component: InfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'estatico', component: EstaticoComponent },
  { path: '', redirectTo: '/estatico', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

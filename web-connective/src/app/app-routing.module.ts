import { EstaticoComponent } from './estatico/estatico.component';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { DoubtsComponent } from './doubts/doubts.component';
import { BiografiaComponent } from './biografia/biografia.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ParticlesComponent } from './particles/particles/particles.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'biography', component: BiografiaComponent, canActivate: [AuthGuardService] },
  { path: 'doubts', component: DoubtsComponent, canActivate: [AuthGuardService] },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'index', component: EstaticoComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

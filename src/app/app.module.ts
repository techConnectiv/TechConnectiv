import { CadastroComponent } from './cadastro/cadastro.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BiografiaComponent } from './biografia/biografia.component';
import { DoubtsComponent } from './doubts/doubts.component';
import { InfoComponent } from './info/info.component';
import { MatProgressBarModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule, MatStepperModule, MatButtonModule, MatOptionModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EstaticoComponent } from './estatico/estatico.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthService } from './service/auth.service';
import { ParticlesComponent } from './particles/particles/particles.component';
import { AuthGuardService } from './service/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'angular2-materialize';
import { ModalComponent } from './home/modal/modal.component';
import { DoacaoComponent } from './doacao/doacao.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BiografiaComponent,
    DoubtsComponent,
    InfoComponent,
    CadastroComponent,
    EstaticoComponent,
    ParticlesComponent,
    ModalComponent,
    DoacaoComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatToolbarModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatTabsModule,
    MatStepperModule,
    MatButtonModule,
    TextMaskModule,
    MatOptionModule,
    MaterializeModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

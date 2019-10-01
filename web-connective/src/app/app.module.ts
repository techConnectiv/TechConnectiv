import { LayoutComponent } from './layout/layout.component';
import { LoadingComponent } from './loading/loading.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BiografiaComponent } from './biografia/biografia.component';
import { DoubtsComponent } from './doubts/doubts.component';
import { InfoComponent } from './info/info.component';
import { MenuComponent } from './menu/menu.component';
import { EmpresaComponent } from './cadastro/empresa/empresa.component';
import { ComumComponent } from './cadastro/comum/comum.component';
import { OngComponent } from './cadastro/ong/ong.component';
import { MatProgressBarModule } from '@angular/material';
import { CarouselModule, CollapseModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BiografiaComponent,
    DoubtsComponent,
    InfoComponent,
    MenuComponent,
    EmpresaComponent,
    ComumComponent,
    OngComponent,
    LoadingComponent,
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
    CarouselModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

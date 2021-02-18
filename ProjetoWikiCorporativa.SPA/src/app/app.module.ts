import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { DominioModule } from './dominio/dominio.module';
import { setTheme, AccordionModule, CarouselModule } from 'ngx-bootstrap';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { PaginaComponent } from './pagina/pagina.component';
import { ArtigoComponent } from './artigo/artigo.component';
import { IndexComponent } from './index/index.component';
import { TopicoComponent } from './topico/topico.component';
import { IndiceComponent } from './indice/indice.component';
import { EdicaoComponent } from './edicao/edicao.component';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Edicao1Component } from './edicao1/edicao1.component';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
//import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorModule } from 'ckeditor4-angular';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Edicao2Component } from './edicao2/edicao2.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuSuperiorComponent,
    PaginaComponent,
    ArtigoComponent,
    IndexComponent,
    TopicoComponent,
    IndiceComponent,
    EdicaoComponent,
    Edicao1Component,
    Edicao2Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,//--> Comentar os módulos que já constam importados
    HttpClientModule,
    DominioModule,
    NgxSpinnerModule,
    HttpClientModule, 
    AngularEditorModule,
    FormsModule, 
    CKEditorModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      maxOpened: 2,
      autoDismiss: true,
      closeButton: true,
      enableHtml: true,
    }),
    TabsModule.forRoot(),
    
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

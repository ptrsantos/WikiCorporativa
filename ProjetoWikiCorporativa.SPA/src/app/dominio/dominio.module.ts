import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxSelectModule} from 'ngx-select-ex';
import { NgSelectModule } from '@ng-select/ng-select';

//import { BsModalRef,ModalModule ,BsModalService } from 'ngx-bootstrap';
import { BsModalRef, BsModalService} from 'ngx-bootstrap';


import { DominioRoutingModule } from './dominio-routing.module';
import { DominioService } from './shared/dominio.service';
import { SharedModule } from '../shared/shared.module';


import { ModalModule } from 'ngx-bootstrap';
import { FormCadastroBaseComponent } from './shared/form-cadastro-base/form-cadastro-base.component';

import { FormEdicaoBaseComponent } from './shared/form-edicao-base/form-edicao-base.component';

import { TemplateExibicaoBaseComponent } from './shared/template-exibicao-base/template-exibicao-base.component';
import { ListaEmpregadosComponent } from './empregado/lista-empregados/lista-empregados.component';
import { CadastroEmpregadoComponent } from './empregado/cadastro-empregado/cadastro-empregado.component';
import { DetalheEmpregadoComponent } from './empregado/detalhe-empregado/detalhe-empregado.component';
import { EdicaoEmpregadoComponent } from './empregado/edicao-empregado/edicao-empregado.component';
import { ExclusaoEmpregadoComponent } from './empregado/exclusao-empregado/exclusao-empregado.component';

// import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaEmpregadosComponent,
    CadastroEmpregadoComponent,
    DetalheEmpregadoComponent,
    EdicaoEmpregadoComponent,
    ExclusaoEmpregadoComponent,
    FormCadastroBaseComponent,
    FormEdicaoBaseComponent,
    TemplateExibicaoBaseComponent,
    
    
  ],
  exports: [
    
  ],
  imports: [
    CommonModule,
    DominioRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    NgSelectModule,
    //NgxDatepickerModule,
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    [BsModalRef],
    [BsModalService],
    DominioService  
  ]
})
export class DominioModule { }

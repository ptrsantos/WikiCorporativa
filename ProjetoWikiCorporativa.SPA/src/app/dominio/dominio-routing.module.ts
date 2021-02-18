import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaEmpregadosComponent} from './empregado/lista-empregados/lista-empregados.component';

import { CadastroEmpregadoComponent } from './empregado/cadastro-empregado/cadastro-empregado.component';
import { DetalheEmpregadoComponent } from './empregado/detalhe-empregado/detalhe-empregado.component';
import { EdicaoEmpregadoComponent } from './empregado/edicao-empregado/edicao-empregado.component';
import { ExclusaoEmpregadoComponent } from './empregado/exclusao-empregado/exclusao-empregado.component';


const routes: Routes = [
  {
    path: 'Empregados', 
    component: ListaEmpregadosComponent, 
    data: { title: 'Listar empregados' }
  },
    {path: 'CadastrarEmpregado', 
    component: CadastroEmpregadoComponent,
    data: { title: 'Cadastrar empregado' }
  },
  {
    path: 'DetalheEmpregado',
    component: DetalheEmpregadoComponent,
    data: { title: 'Detalhes do empregado' }
  },
  {
    path: 'EditarEmpregado',
    component: EdicaoEmpregadoComponent,
    data: { title: 'Editar empregado' }
  },
  {
    path: 'ExcluirEmpregado',
    component: ExclusaoEmpregadoComponent,
    data: { title: 'Excluir empregado' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DominioRoutingModule { }

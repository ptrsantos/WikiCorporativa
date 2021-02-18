import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtigoComponent } from './artigo/artigo.component';
import { EdicaoComponent } from './edicao/edicao.component';
import { Edicao1Component } from './edicao1/edicao1.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';



const routes: Routes = [
  { path: 'Home', component: HomeComponent, data: { title: 'Home' } },
  //{ path: 'Home', component: IndexComponent, data: { title: 'Home' } },
  { path: '', pathMatch: 'full', redirectTo: 'Home' },
  { path: 'Artigo', component: ArtigoComponent, data: { title: 'Home' } },
  { path: 'Editar', component: EdicaoComponent, data: { title: 'Home' } },
  { path: 'Editar1', component: Edicao1Component, data: { title: 'Home' } },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

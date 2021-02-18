import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap';
import { Artigo } from '../dominio/wiki/models/artigo';
//import { Component, ViewChild } from '@angular/core';
//import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.component.html',
  styleUrls: ['./artigo.component.css']
})
export class ArtigoComponent implements OnInit {

  titulo: string
  corpo: string
  descricao: string
  artigoParam: Artigo

  value: string;
  constructor(private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    
    this.route.params.subscribe( param =>{
      
      var datePipe = new DatePipe('pt-BR');
      ////debugger
      console.log(param)
      this.artigoParam = param as Artigo
      //console.log(this.artigoInput)
      // this.dataExibicao = datePipe.transform(param['Emissao'], 'dd/MM/yyyy')
      
      // this.consulta.DocumentoId = param['DocumentoId'];
      // this.consulta.Numero = param['Numero'];
      // this.consulta.Responsavel = param['Responsavel'];
      // this.consulta.Emissao = param['Emissao'];
      // // this.consulta.Valido = param['Valido'];
      // this.consulta.Assunto = param['Assunto'];
      // this.consulta.ResumoConsulta = param['ResumoConsulta'];
      // this.consulta.ResumoResposta = param['ResumoResposta'];
      
    })
  }

  onSelect(data: TabDirective): void {
    this.value = data.heading;
  }

  // abrirEdicao(){
  //   this.router.navigate(['Editar', this.artigo]);
  //   //this.router.navigate(['Editar1', this.artigo]);
  // }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Empregado } from '../../empregado/models/empregado';

@Component({
  selector: 'app-template-exibicao-base',
  templateUrl: './template-exibicao-base.component.html',
  styleUrls: ['./template-exibicao-base.component.css']
})
export class TemplateExibicaoBaseComponent implements OnInit {

  empregado: Empregado = new Empregado()
  dataExibicao: string
  @Output() enviarEmpregado = new EventEmitter()
  @Input() titulo: string
  @Input() botao: string
  @Input() icone: string
  @Output() enviarEventoVoltar =  new EventEmitter()


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe( param =>{

      var datePipe = new DatePipe('pt-BR');
      //this.dataExibicao = datePipe.transform(param['Emissao'], 'dd/MM/yyyy')

      this.empregado. Id = param['Id'];
      this.empregado.Matricula = param['Matricula'];
      this.empregado.Nome = param['Nome'];
      this.empregado.Coordenacao = param['Coordenacao'];
      this.empregado.Unidade = param['Unidade'];
  
      
    })
  }
  
  submit(){
    //debugger
    this.enviarEmpregado.emit(this.empregado)
  }

  voltarPagina(dado){
    //debugger
    this.enviarEventoVoltar.emit(dado)
  }

}

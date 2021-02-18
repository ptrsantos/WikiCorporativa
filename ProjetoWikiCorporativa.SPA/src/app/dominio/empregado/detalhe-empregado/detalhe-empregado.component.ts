import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Empregado } from '../models/empregado';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detalhe-empregado',
  templateUrl: './detalhe-empregado.component.html',
  styleUrls: ['./detalhe-empregado.component.css']
})
export class DetalheEmpregadoComponent implements OnInit {

  tituloDetalhes= "Detalhes do empregado"
  iconeEditar = 'fa fa-wrench'
  textoBotao = 'Editar'
  oficio: Empregado = new Empregado();
  dataExibicao: string;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.ocultarSpinner()
  }

  receberEmpregado(empregado){
    //this.spinnerService.show()
    this.router.navigate(['EditarEmpregado', empregado])
  }

  voltarPagina(evento){
    //this.spinnerService.show()
    this.router.navigate(['Empregados'])
  }

  ocultarSpinner(){
    setTimeout(() => {
      this.spinnerService.hide()
    }, 500)
  }

  ngOnDestroy(){
    this.spinnerService.show()
  }

}

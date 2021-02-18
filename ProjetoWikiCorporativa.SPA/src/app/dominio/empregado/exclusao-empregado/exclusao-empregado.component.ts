import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empregado } from '../models/empregado';
import { DominioService } from '../../shared/dominio.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorParserService } from 'src/app/shared/errors/error-message-parser.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-exclusao-empregado',
  templateUrl: './exclusao-empregado.component.html',
  styleUrls: ['./exclusao-empregado.component.css']
})
export class ExclusaoEmpregadoComponent implements OnInit, OnDestroy {
  
  empregado: Empregado = new Empregado()
  dataExibicao: string;
  subscription = new Subject()

  tituloExcluir= "Exclusão do empregado selecionado - Cuidado. Essa operação é irreversível!"
  iconeExcluir = 'fa fa-trash'
  textoBotao = 'Excluir'

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private dominioService: DominioService,
              private toastrService: ToastrService,
              private errorParser: ErrorParserService,
              private spinnerService: NgxSpinnerService) {}
  
  ngOnInit() {
    this.ocultarSpinner()
  }

  receberEmpregado(empregadoParam){
    this.spinnerService.show()
    this.dominioService.excluirEmpregado(empregadoParam.Id.toString()).subscribe(dados => {
        ////debugger
        this.empregado = dados
        this.toastrService.success(`Empregado excluido com sucesso!<br>`)
        this.router.navigate(['Empregados'])
      }, 
      err => {
        this.spinnerService.hide()
        this.toastrService.error(`Erro ao excluir empregado!<br>${this.errorParser.getErrorMessage(err)}`, 'Erro');
      }
    )
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
    this.subscription.unsubscribe()
  }

}

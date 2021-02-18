import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Empregado } from '../models/empregado';
import { DominioService } from '../../shared/dominio.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorParserService } from 'src/app/shared/errors/error-message-parser.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edicao-empregado',
  templateUrl: './edicao-empregado.component.html',
  styleUrls: ['./edicao-empregado.component.css']
})
export class EdicaoEmpregadoComponent  implements OnInit, OnDestroy {
 
  empregado: Empregado = new Empregado()
  titulo = "Editar Empregado"
  iconeCadastrar = 'fas fa-dice-d20'
  subscription = new Subject()
  
  constructor(private dominioService: DominioService, 
              private router: Router,
              private toastrService: ToastrService,
              private errorParser: ErrorParserService,
              private spinnerService: NgxSpinnerService) {}

    ngOnInit() {
      this.ocultarSpinner()
     }

    receberEmpregado(empregadoParam) {
      this.spinnerService.show()
      this.empregado = Object.assign({}, new Empregado, JSON.parse(empregadoParam))
      this.dominioService.editarEmpregado(this.empregado).subscribe(dados => {
        this.empregado = dados;
        this.toastrService.success(`Empregado salvo com sucesso!<br>`)
        this.router.navigate(['Empregados'])
        }, 
        err => {
          this.spinnerService.hide()
          this.toastrService.error(`Erro ao salvar edição do empregado!<br>${this.errorParser.getErrorMessage(err)}`, 'Erro');
        },
        () => {
          console.log("Completou o ciclo")
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

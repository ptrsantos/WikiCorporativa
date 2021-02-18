import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DominioService } from '../dominio.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subject } from '../../../../../node_modules/rxjs';
import { Empregado } from '../../empregado/models/empregado';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { ErrorParserService } from 'src/app/shared/errors/error-message-parser.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-edicao-base',
  templateUrl: './form-edicao-base.component.html',
  styleUrls: ['./form-edicao-base.component.css']
})
export class FormEdicaoBaseComponent implements OnInit, OnDestroy {

  form: FormGroup

  @Output() enviarEmpregado = new EventEmitter()
  @Output() enviarEventoVoltar = new EventEmitter()

  empregado: Empregado = new Empregado()

  listaAreasDestinos: string[]
  textoBotao = "habilita"
  EmpregadoValido: boolean
  mensagemDeErro = ''
  formValido: boolean

  subscript = new Subject()

  constructor(private route: ActivatedRoute,
    private toastrService: ToastrService,
    private errorParser: ErrorParserService,
    private formBuilder: FormBuilder,
    private dominioService: DominioService,
    private router: Router) {
  }


  ngOnInit() {
    this.route.params.subscribe(param => {

      this.empregado.Id = param['Id'];
      this.empregado.Matricula = param['Matricula'];
      this.empregado.Nome = param['Nome'];
      this.empregado.Coordenacao = param['Coordenacao'];
      this.empregado.Unidade = param['Unidade'];

    })
    this.incluirCamposNoForm()

  }


  submeter(form) {
    //debugger
    let v = this.form.valid
    if (form.valid) {
      //debugger
      this.empregado.Id = form.get('Id').value
      this.empregado.Matricula = form.get('Matricula').value.toUpperCase()
      this.empregado.Nome = form.get('Nome').value
      this.empregado.Coordenacao = form.get('Coordenacao').value
      this.empregado.Unidade = form.get('Unidade').value

      let EmpregadoJson = JSON.stringify(this.empregado)
      this.enviarEmpregado.emit(EmpregadoJson)
    }
  }

  voltarPagina(dado) {
    this.enviarEventoVoltar.emit(dado)
  }

  incluirCamposNoForm() {

    this.form = this.formBuilder.group
      ({

        Id: [this.empregado.Id, ""],
        Matricula: [this.empregado.Matricula, ""],
        Nome: [this.empregado.Nome, [Validators.required, Validators.maxLength(100)]],
        Coordenacao: [this.empregado.Coordenacao, [Validators.required, Validators.maxLength(100)]],
        Unidade: [this.empregado.Unidade, [Validators.required, Validators.pattern("^[0-9]{4}")]],
      })
  }


  validaCampoMatricula(campo) {
    this.formValido = this.form.valid
    return this.form.get(campo).touched && (this.form.get(campo).hasError('pattern') || this.form.get(campo).hasError('required'))
  }

  validaCampoNome(campo) {
    this.formValido = this.form.valid
    return this.form.get(campo).touched && (this.form.get(campo).hasError('maxlength') || this.form.get(campo).hasError('required'))
  }


  validaCampoCoordenacao(campo) {
    this.formValido = this.form.valid
    return this.form.get(campo).touched && (this.form.get(campo).hasError('required') || this.form.get(campo).hasError('maxlength'))
  }

  validaCampoUnidade(campo) {
    this.formValido = this.form.valid
    return this.form.get(campo).touched && (this.form.get(campo).hasError('pattern') || this.form.get(campo).hasError('required'))
  }

  ngOnDestroy() {
    this.subscript.unsubscribe()
  }

}

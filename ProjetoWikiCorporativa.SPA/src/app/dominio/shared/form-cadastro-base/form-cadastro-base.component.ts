import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DominioService } from '../dominio.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Subject } from '../../../../../node_modules/rxjs';
import { Empregado } from '../../empregado/models/empregado';
import { ErrorParserService } from 'src/app/shared/errors/error-message-parser.service';


@Component({
  selector: 'app-form-cadastro-base',
  templateUrl: './form-cadastro-base.component.html',
  styleUrls: ['./form-cadastro-base.component.css']
})
export class FormCadastroBaseComponent implements OnInit, OnDestroy {
  
  form: FormGroup
  @Input() tituloRecebido:string
  @Output() enviarCadastro = new EventEmitter()
  @Input() iconeBotao: string
  @Output() enviarEventoVoltar =  new EventEmitter()

  empregado: Empregado = new Empregado()
  data: any;
  areaDestino: string = "";
  listaDeAreasDestinos: string[]
  selected = false;
  formValido: boolean

  subscript = new Subject()


  constructor(private dominioService: DominioService,
    private toastrService: ToastrService,
    private errorParser: ErrorParserService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }
  
  ngOnInit() {
    let dataAtual = Date.now();
    var datePipe = new DatePipe('pt-BR');
    this.data = datePipe.transform(dataAtual, 'dd/MM/yyyy')

    this.incluirCamposNoForm()
    //this.listarDestinatariosDropDown()
  }

  submeter(form) {
    //debugger
    if (form.valid) {
      this.empregado.Matricula = form.controls.Matricula.value.toUpperCase()
      this.empregado.Nome = form.get('Nome').value
      this.empregado.Coordenacao = form.controls.Coordenacao.value
      this.empregado.Unidade = form.get('Unidade').value
      
      let documentoJson = JSON.stringify(this.empregado)
      this.enviarCadastro.emit(documentoJson)
    }
  }

  voltarPagina(dado){
    this.enviarEventoVoltar.emit(dado)
  }
  
  incluirCamposNoForm() {
    this.form = this.formBuilder.group
    ({
      Matricula: [null, [Validators.required, Validators.pattern("^[cC]{1}[0-9]{6}")]], 
      Nome: [null, [Validators.required, Validators.maxLength(100)]],
      Coordenacao: [null, [Validators.required, Validators.maxLength(100)]],
      Unidade: [null,  [Validators.required, Validators.pattern("^[0-9]{4}")]],
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

  ngOnDestroy(){
    this.subscript.unsubscribe()
  }
}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableDirective } from '../../../shared/directives/data-table.directive';
import { Subject } from 'rxjs';
import { pt_Br } from '../../../shared/config/data-table-language-pt-bt.config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empregado } from '../../empregado/models/empregado';
import { DominioService } from '../../shared/dominio.service';
import { ErrorParserService } from 'src/app/shared/errors/error-message-parser.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-lista-empregados',
  templateUrl: './lista-empregados.component.html',
  styleUrls: ['./lista-empregados.component.css']
})
export class ListaEmpregadosComponent implements OnInit {


  empregados: any[] = []
  empregado: Empregado
  tituloBotaoCadastrar: string

  @Input() titulo: string
  @Input() tipo: string

  dataTableOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  matriculaUsuario: string

  botaoExcluirDesativado: boolean

  constructor(private dominioService: DominioService,
    private toastrService: ToastrService,
    private errorParser: ErrorParserService,
    private router: Router,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.botaoExcluirDesativado = true
    this.inicializarDataTable()
    this.carregarEmpregados()
  }
  
  ocultarSpinner(){
    setTimeout(() => {
      this.spinnerService.hide()
    }, 500)
  }

  carregarEmpregados() {
    this.tituloBotaoCadastrar = "Cadastrar novo empregado"
    //debugger
    this.dominioService.listarEmpregados().subscribe(dados => {
      this.empregados = dados
      this.carregarDataTable(dados);

      
    }, err => {
      this.toastrService.error(`Erro ao carregar a tabela!<br>${this.errorParser.getErrorMessage(err)}`, 'Erro');
    }
    )
  }

  alternarChecked(){
    this.botaoExcluirDesativado = !this.botaoExcluirDesativado
  }

  deletarTodos(){
    this.spinnerService.show()
    this.dominioService.excluirTodosEmpregados().subscribe(response => {
      this.router.navigate(['Home'])
      this.toastrService.success(`Todos empregados excluidos com sucesso!<br>`)
      this.spinnerService.hide()
    }), err => {
       this.toastrService.error(`Erro ao carregar a tabela!<br>${this.errorParser.getErrorMessage(err)}`, 'Erro');
       this.spinnerService.hide()
    }
  }

  irParaCadastro() {
    this.cadatrarEmpregado()
  }

  cadatrarEmpregado() {
    this.spinnerService.show()
    this.router.navigate(['CadastrarEmpregado'])
  }

  editarEmpregado(empregado: Empregado) {
    //this.spinnerService.show()
    this.router.navigate(['EditarEmpregado', empregado]); 
  }

  excluirEmpregado(empregado: Empregado) {
    //this.spinnerService.show()
    this.router.navigate(['ExcluirEmpregado', empregado]);
  }

  exibirDetalhes(empregado: Empregado) {
    //this.spinnerService.show()
    this.router.navigate(['DetalheEmpregado', empregado]); 
  }

  carregarDataTable(empregados: Empregado[]) {
    this.empregados = empregados;
    this.rerender();
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      setTimeout(() => this.dtTrigger.next(), 150);
      this.ocultarSpinner()
    });
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  inicializarDataTable() {
    this.dataTableOptions = {
      dom: '<"top"l>rt<"bottom"ipf><"clear">', //'<"top"lf>rt<"bottom"ip><"clear">', 
      //scrollY: "500px",
      scrollCollapse: false,
      paging: true,
      language: pt_Br,
      lengthChange: true,
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "Tudo"]],
      pageLength: 5,
      order: [0, "asc"],
      columns: [
        { data: "Id", title: "Id" },
        { data: "Matricula", title: "Matricula" },
        { data: "Nome", title: "Nome" },
        { data: "Coordenacao", title: "Coordenação" },
        { data: "Unidade", title: "Unidade" },
         { title: "Ações", "orderable": false, className: "dt-center" }
      ],
      responsive: true

    };
  }

  ngOnDestroy(): void {
    this.spinnerService.show()
    this.dtTrigger.unsubscribe();
  }

}

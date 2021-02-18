import { Artigo } from './../wiki/models/artigo';
import { Topico } from './../wiki/models/topico';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Empregado } from '../empregado/models/empregado';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { first } from 'rxjs/operators';

const controllerEmpregados = "Empregados";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsSemAuth = {
  headers: new HttpHeaders({ 'nao_incluir_token': 'true', 'Content-Type': 'application/json' }),
  responseType: 'json'
}


const headersSemAuth = new HttpHeaders({ 'nao_incluir_token': 'true', 'Content-Type': 'application/json' })

const headers = new HttpHeaders({ 'Content-Type': 'application/json' })

@Injectable({
  providedIn: 'root'
})

export class DominioService {


  constructor(private http: HttpClient) { }

  // listarEmpregados(): Observable<Empregado[]> {
  //   return this.http.get<Empregado[]>(`${environment.ApiControleEmpregadoUrl}${controllerEmpregados}ListarEmpregados`, {headers: new HttpHeaders({ 'nao_incluir_token': 'true'})})
  //     .pipe(
  //       first())
  // }
  listarEmpregados(): Observable<Empregado[]> {
    return this.http.get<Empregado[]>(`${environment.ApiControleEmpregadoUrl}${controllerEmpregados}`)
      .pipe(
        first())
  }


  cadastrarEmpregado(empregado: Empregado): Observable<Empregado> {
    return this.http
      //.post<Empregado>(`${environment.ApiControleEmpregadoCIUrl}${controllerEmpregados}CadastrarEmpregado`, Empregado, { headers: headersSemAuth})
      .post<Empregado>(`${environment.ApiControleEmpregadoUrl}${controllerEmpregados}`, empregado)
      .pipe(
        first()
      )
  }

  editarEmpregado(empregado: Empregado): Observable<Empregado> {
    return this.http
      .put<Empregado>(`${environment.ApiControleEmpregadoUrl}${controllerEmpregados}`, empregado, {headers: headersSemAuth})
      //.put<Empregado>(`${environment.ApiControleEmpregadoCIUrl}${controllerEmpregados}EditarEmpregado`, Empregado, { headers: headers, responseType: 'json'})
      .pipe(
        first()
      )
  }

  excluirEmpregado(id: string): Observable<any> {
    //debugger
    let params = new HttpParams;
    params = params.set("id", id)
    return this.http
      .delete<any>(`${environment.ApiControleEmpregadoUrl}${controllerEmpregados}`, { params: params, headers: headersSemAuth})
      //.delete<any>(`${environment.ApiControleEmpregadoCIUrl}${controllerEmpregados}ExcluirEmpregado`, {params: params, headers: headers, responseType: 'json' })
      .pipe(
        first()
      )
  }

  excluirTodosEmpregados(): Observable<any>{
    return this.http
      .delete<any>(`${environment.ApiControleEmpregadoUrl}${controllerEmpregados}`)
      .pipe(
        first()
      )
  }

  //----Desenvolvimento wiki
  retornaTopicos(topico: Topico[]): Observable<Topico[]>{
    return this.http
      .get<Topico[]>(`http://localhost:3000/topicos`)
      .pipe(
        first()
      )
  }

  retornaArtigos(topico: Artigo): Observable<any[]>{
    return this.http
      .get<any[]>(`http://localhost:3000/topicos/artigos`)
      .pipe(
        first()
      )
  }

}

import { Artigo } from './../dominio/wiki/models/artigo';
import { Component, OnInit } from '@angular/core';
import { DominioService } from '../dominio/shared/dominio.service';
import { Topico } from '../dominio/wiki/models/topico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.css']
})
export class IndiceComponent implements OnInit {
  
  
  topicos: Topico[] = []
  artigo: Artigo
  titulo: string = ""

  constructor(private dominioService: DominioService, private router: Router) { 
    //this.topicos = new Array<Topico>()
  }

  ngOnInit() {
    this.dominioService.retornaTopicos(this.topicos).subscribe(dados => {
      //this.teste.push("Testando inclusao")
      var retorno = dados
      //this.topicos = Object.assign({}, new Topico, JSON.parse(JSON.stringify(dados)));
      this.topicos = dados;
      for(var item of this.topicos){
        this.titulo = item.assunto
      }

      var tamanho = this.topicos.length
      for(var i =0; i<tamanho; i++){
        this.titulo = this.topicos[i].assunto
      }

    })

  }
  
  abrirArtigo(artigo){
    //debugger
    console.log(artigo)
    this.router.navigate(['Artigo', artigo]);
  }

}

import { Artigo } from './../dominio/wiki/models/artigo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edicao2',
  templateUrl: './edicao2.component.html'
})
export class Edicao2Component implements OnInit {

  @Input() artigo: Artigo
  ckeConfig: any;
  tituloArtigo: string

  public model = {
    editorData: ''
  };

//public Editor = ClassicEditor;

  constructor() { }

  ngOnInit() {
    this.ckeConfig = {
      removePlugins: 'undo'
    };
    this.model.editorData = this.artigo.corpo
    this.tituloArtigo = this.artigo.titulo

  }

  onChange(event){

  }

}

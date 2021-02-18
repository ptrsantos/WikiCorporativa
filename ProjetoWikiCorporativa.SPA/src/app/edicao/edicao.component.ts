import { ArtigoComponent } from './../artigo/artigo.component';
import { Artigo } from './../dominio/wiki/models/artigo';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChildren, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { StringDecoder } from 'string_decoder';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.css']
})
export class EdicaoComponent implements OnInit {

  @Input() artigo: Artigo
  tituloArtigo: string
  // @ViewChildren('editor') editorViewChild: ElementRef;
  // editorComponent: any
  // conteudo: string
  // conteudoEditado: any =''
  // elemento: any
  // @Input() variavelHtml: any = "Paulo"
  // documento: any

  htmlContent = ""

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '40px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.htmlContent = this.artigo.corpo
    this.tituloArtigo = this.artigo.titulo
    // this.route.params.subscribe(param => {

    //   var datePipe = new DatePipe('pt-BR');
    //   //debugger
    //   //console.log(param)
    //   this.conteudo = param.corpo
    //   // this.router.navigate['Editar']

    //   // this.artigo = param as Artigo
    //   // console.log(this.artigo)
    //   // this.dataExibicao = datePipe.transform(param['Emissao'], 'dd/MM/yyyy')

    //   // this.consulta.DocumentoId = param['DocumentoId'];
    //   // this.consulta.Numero = param['Numero'];
    //   // this.consulta.Responsavel = param['Responsavel'];
    //   // this.consulta.Emissao = param['Emissao'];
    //   // // this.consulta.Valido = param['Valido'];
    //   // this.consulta.Assunto = param['Assunto'];
    //   // this.consulta.ResumoConsulta = param['ResumoConsulta'];
    //   // this.consulta.ResumoResposta = param['ResumoResposta'];
    // })

    //this.capturarDadosDaPagina()


  }

  // ngAfterViewInit() {
  //   this.htmlContent = this.artigo.corpo
    // var result = this.editorViewChild['_results']
    // this.editorComponent = result[0]
    // this.editorComponent.textArea.nativeElemente.contetText = this.conteudo

    // this.simulandoOnInit(editor)
    // this.simulandoNgAfterViewInit(editor)

    // editor.writeValue(this.conteudo)
    // editor.onContentChange(result[0].textArea.nativeElement)
    // alert(editor.textArea.nativeElement.className)

  //}

  exibirConteudo(){
    let conteudo = document.querySelector('.html').textContent
    alert(conteudo)
  }

  exibirConteudoProcessado(){
    let conteudo = document.querySelector('.html').textContent
    //alert(conteudo)
    //var regex = "/<(.|\n)*?>/";
    var regex = "/<.*?>/g"
    var result = conteudo.replace(/(<([^>]+)>)/gi, "");
    var resultadoFinal = this.char_convert(result)
    debugger
    alert(resultadoFinal);
  }
  
  char_convert(texto: string) {

    var stringSaida = ''
    var chars = ["©","Û","®","ž","Ü","Ÿ","Ý","$","Þ","%","¡","ß","¢","à","£","á","À","¤","â","Á","¥","ã","Â","¦","ä","Ã","§","å","Ä","¨","æ","Å","©","ç","Æ","ª","è","Ç","«","é","È","¬","ê","É","­","ë","Ê","®","ì","Ë","¯","í","Ì","°","î","Í","±","ï","Î","²","ð","Ï","³","ñ","Ð","´","ò","Ñ","µ","ó","Õ","¶","ô","Ö","·","õ","Ø","¸","ö","Ù","¹","÷","Ú","º","ø","Û","»","ù","Ü","@","¼","ú","Ý","½","û","Þ","€","¾","ü","ß","¿","ý","à","‚","À","þ","á","ƒ","Á","ÿ","å","„","Â","æ","…","Ã","ç","†","Ä","è","‡","Å","é","ˆ","Æ","ê","‰","Ç","ë","Š","È","ì","‹","É","í","Œ","Ê","î","Ë","ï","Ž","Ì","ð","Í","ñ","Î","ò","‘","Ï","ó","’","Ð","ô","“","Ñ","õ","”","Ò","ö","•","Ó","ø","–","Ô","ù","—","Õ","ú","˜","Ö","û","™","×","ý","š","Ø","þ","›","Ù","ÿ","œ","Ú"]; 
    var codes = ["&copy;","&#219;","&reg;","&#158;","&#220;","&#159;","&#221;","&#36;","&#222;","&#37;","&#161;","&#223;","&#162;","&#224;","&#163;","&#225;","&Agrave;","&#164;","&#226;","&Aacute;","&#165;","&#227;","&Acirc;","&#166;","&#228;","&Atilde;","&#167;","&#229;","&Auml;","&#168;","&#230;","&Aring;","&#169;","&#231;","&AElig;","&#170;","&#232;","&Ccedil;","&#171;","&#233;","&Egrave;","&#172;","&#234;","&Eacute;","&#173;","&#235;","&Ecirc;","&#174;","&#236;","&Euml;","&#175;","&#237;","&Igrave;","&#176;","&#238;","&Iacute;","&#177;","&#239;","&Icirc;","&#178;","&#240;","&Iuml;","&#179;","&#241;","&ETH;","&#180;","&#242;","&Ntilde;","&#181;","&#243;","&Otilde;","&#182;","&#244;","&Ouml;","&#183;","&#245;","&Oslash;","&#184;","&#246;","&Ugrave;","&#185;","&#247;","&Uacute;","&#186;","&#248;","&Ucirc;","&#187;","&#249;","&Uuml;","&#64;","&#188;","&#250;","&Yacute;","&#189;","&#251;","&THORN;","&#128;","&#190;","&#252","&szlig;","&#191;","&#253;","&agrave;","&#130;","&#192;","&#254;","&aacute;","&#131;","&#193;","&#255;","&aring;","&#132;","&#194;","&aelig;","&#133;","&#195;","&ccedil;","&#134;","&#196;","&egrave;","&#135;","&#197;","&eacute;","&#136;","&#198;","&ecirc;","&#137;","&#199;","&euml;","&#138;","&#200;","&igrave;","&#139;","&#201;","&iacute;","&#140;","&#202;","&icirc;","&#203;","&iuml;","&#142;","&#204;","&eth;","&#205;","&ntilde;","&#206;","&ograve;","&#145;","&#207;","&oacute;","&#146;","&#208;","&ocirc;","&#147;","&#209;","&otilde;","&#148;","&#210;","&ouml;","&#149;","&#211;","&oslash;","&#150;","&#212;","&ugrave;","&#151;","&#213;","&uacute;","&#152;","&#214;","&ucirc;","&#153;","&#215;","&yacute;","&#154;","&#216;","&thorn;","&#155;","&#217;","&yuml;","&#156;","&#218;"];

    for(let x=0; x<chars.length; x++){
        for (let i=0; i<texto.length; i++){
          //texto.charCodeAt[i].value = texto.charCodeAt[i].value.replace(chars[x], codes[x]);
          var item1 = texto.substr(i, 1)
          var item3 = texto.substr(i+4, 1)
          var item2 = texto.substr(i+5, 1)
          var item4 = texto.substr(i+6, 1)
          var troca = texto.substr(i, i+5).trim()

          debugger
          if((item1 == "&" && item2 == ";") || (item1 == "&" && item3 == ";") || (item1 == "&" && item4 == ";")){
            var procurado = codes[x]
            var troca = chars[x]
            texto = texto.replace(procurado, troca)
          }
        }
    }
     return texto
 }

  retirarMarcacoesHtml(texto){
    var regex = "/<(.|\n)*?>/";
    var result = texto.replace(regex, "");
    alert(result);

    // String.prototype.stripHTML = function() {return this.replace(/<.*?>/g, '');}
    // // Exemplo de utilização
    // var txt = "<p>este é <u>apenas</u> um <b>teste</b> para a função <i>stripHTML</i>.</p>";
    // txt = txt.stripHTML();
  }


ngOnChange() {
  //debugger
  // console.log(this.editor)
  // console.log(this.conteudo)

}

receberHtml(event) {
  //alert("Recebi o evento")
}




}

import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
// import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent {

  ambiente: string;
  foto: any;
  isCollapsed: boolean = true;

  distribuicaoAtiva: string = 'active';
  checklistAtivo: string = '';
  analiseAtiva: string = '';
  relatoriosAtivo: string = '';
  elementRef: any;

  estado = '';

  constructor(
    private router: Router,
     private domSanitizer: DomSanitizer) {

    this.ambiente = environment.envName;

  }


  ativa(event: Event){
    let elemento = event.target as Element
    elemento.className = 'active'
   }

  desativa(event: Event){
    let elemento = event.target as Element
    elemento.className = ''
  }

}

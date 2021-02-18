import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData, DatePipe } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { defineLocale, ptBrLocale, BsDatepickerModule, DatepickerModule } from 'ngx-bootstrap';

import { DataTableDirective } from './directives/data-table.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorParserService } from './errors/error-message-parser.service';


defineLocale('pt-br', ptBrLocale);
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    DataTableDirective,
    DataTableDirective,
  
  ],
  exports: [
    DataTableDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
  ],
  providers: [
    DatePipe,
    ErrorParserService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class SharedModule { }

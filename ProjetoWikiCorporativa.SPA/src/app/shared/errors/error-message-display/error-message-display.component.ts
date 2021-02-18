import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message-display',
  templateUrl: './error-message-display.component.html',
  styleUrls: ['./error-message-display.component.css']
})
export class ErrorMessageDisplayComponent implements OnInit {

  @Input() controlName: string;
  @Input() exibirErro: boolean;

  @Input() control: FormControl;
  @Input() validationMessages: { [key: string]: { [key: string]: string } };

  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {
    let erro: string = '';
    for (const propertyName in this.control.errors) {
      if (erro != '') {
        erro += '<br>';
      }

      if (this.validationMessages[this.controlName][propertyName] !== undefined)
        erro += `*${this.validationMessages[this.controlName][propertyName]}`;
    }

    // for (const propertyName in this.control.errors) {
    //   if (this.control.errors.hasOwnProperty(propertyName) &&
    //     this.control.touched) {
    //     return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
    //   }
    // }

    return erro;
  }

}

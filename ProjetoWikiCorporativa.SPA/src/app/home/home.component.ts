import { Component, OnInit, OnDestroy } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.ocultarSpinner()
  }

  ocultarSpinner(){
    setTimeout(() => {
      this.spinnerService.hide()
    }, 500)
  }

  ngOnDestroy(){
    this.spinnerService.show()
  }

}

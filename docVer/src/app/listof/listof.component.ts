import { Component, OnInit } from '@angular/core';
import { formlist} from './listof.model'

@Component({
  selector: 'app-listof',
  templateUrl: './listof.component.html',
  styleUrls: ['./listof.component.css']
})
export class ListofComponent implements OnInit {
  displayButton=false;
  displayForm=false;
  public documents:formlist[]=[
    new formlist('Something','Someotherthing'),
    new formlist('Something','Someotherthing'),
    new formlist('Something','Someotherthing'),
    new formlist('Something','Someotherthing')
  ]

  constructor() { }

  ngOnInit() {
  }
  onListclick(){
    this.displayButton=!this.displayButton
  }
  onButtonclick(){
    this.displayForm=!this.displayForm
  }

}

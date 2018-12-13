import { Component, OnInit } from '@angular/core';
import { formlist} from './listof.model'

@Component({
  selector: 'app-listof',
  templateUrl: './listof.component.html',
  styleUrls: ['./listof.component.css']
})
export class ListofComponent implements OnInit {
  public documents:formlist[]=[
    new formlist('Something','Someotherthing'),
    new formlist('Something','Someotherthing'),
    new formlist('Something','Someotherthing'),
    new formlist('Something','Someotherthing')
  ]

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { formlist} from './listof.model'

@Component({
  selector: 'app-listof',
  templateUrl: './listof.component.html',
  styleUrls: ['./listof.component.css']
})
export class ListofComponent implements OnInit {

  @Output() onGenerate = new EventEmitter<formlist>()
  
  public documents:formlist[]=[
    new formlist('Birth Certificate','birthForum'),
    new formlist('Death Certificate','deathForum'),
    new formlist('Marriage Certificate','marriageForum'),
    
  ]

  constructor() { }

  ngOnInit() {
  }
  

  generateDoc(whichForm){
    this.onGenerate.emit(whichForm)
    
  }

}

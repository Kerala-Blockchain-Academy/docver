import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { formlist} from './listof.model'


interface listObj {
  name: String,
  path: String
}
@Component({
  selector: 'app-listof',
  templateUrl: './listof.component.html',
  styleUrls: ['./listof.component.css']
})
export class ListofComponent implements OnInit {

  @Output() onGenerate = new EventEmitter<formlist>()
  public documents: listObj[] = [
    {name: 'Birth Certificate', path: 'birthForm'},
    {name: 'Death Certificate', path: 'deathForm'},

  ]
  // public documents:formlist[]=[
  //   new formlist('Birth Certificate','birthForum'),
  //   new formlist('Death Certificate','deathForum'),
  //   new formlist('Marriage Certificate','marriageForum'),
    
  // ]

  constructor() { }

  ngOnInit() {
  }
  

  generateDoc(whichForm){
    this.onGenerate.emit(whichForm)
    
  }

}

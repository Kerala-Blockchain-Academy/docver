import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router'
import { Action } from 'rxjs/internal/scheduler/Action';

interface buttonAction{
  action: String,
  path: String
}
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit { 

  @Input() action:buttonAction;
  @Output()
  private myStyle;

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.action.action === "Generate"){
      this.changeStyle();
    }
  }

  buttonClick(event):void {
    event.preventDefault();
    console.log(this.action);
    if(this.action.action==='Verify'){
      this.router.navigate([ 'verifyit' ])
    }

    else{this.router.navigate([ this.action.action + '/' + this.action.path])};
  }

  changeStyle(): void {
    this.myStyle = {
      'background-color': 'lime'
    }
  }

}

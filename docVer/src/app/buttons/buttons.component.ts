import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'

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
    this.router.navigate(['form']);
  }

  changeStyle(): void {
    this.myStyle = {
      'background-color': 'lime'
    }
  }

}

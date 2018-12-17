import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {
  @Input() whatForm: String = "birthForum";
  constructor() { }

  ngOnInit() {
  }
  logme(){
    console.log(this.whatForm)
  }

}

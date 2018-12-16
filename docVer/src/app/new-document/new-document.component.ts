import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {
  @Input() whatForm;
  constructor() { }

  ngOnInit() {
  }
  logme(){
    console.log(this.whatForm)
  }

}

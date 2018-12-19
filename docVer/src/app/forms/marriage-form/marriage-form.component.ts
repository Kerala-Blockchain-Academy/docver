import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marriage-form',
  templateUrl: './marriage-form.component.html',
  styleUrls: ['./marriage-form.component.css']
})
export class MarriageFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(form)
  }
}

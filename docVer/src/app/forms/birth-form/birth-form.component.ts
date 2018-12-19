import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-birth-form',
  templateUrl: './birth-form.component.html',
  styleUrls: ['./birth-form.component.css']
})
export class BirthFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onSubmit(form){
    // $event.preventDefault()
    console.log(form)
  }

}

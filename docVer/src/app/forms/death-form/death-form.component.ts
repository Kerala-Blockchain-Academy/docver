import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-death-form',
  templateUrl: './death-form.component.html',
  styleUrls: ['./death-form.component.css']
})
export class DeathFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onSubmit(form){
    console.log(form)
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-death-form',
  templateUrl: './death-form.component.html',
  styleUrls: ['./death-form.component.css']
})
export class DeathFormComponent implements OnInit {
  action
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(params=>{
      this.action=params['action']

    })
  }
  onSubmit(form){
    console.log(this.action,",",form.value)
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-death-form',
  templateUrl: './death-form.component.html',
  styleUrls: ['./death-form.component.css']
})
export class DeathFormComponent implements OnInit {
  action
  href
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.href=this.route.url
    this.action=this.href.value[0].path
    console.log(this.action)
  }
  onSubmit(form){
    console.log(this.action,",",form.value)
  }

}

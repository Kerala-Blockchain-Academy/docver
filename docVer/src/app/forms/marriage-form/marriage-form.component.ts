import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-marriage-form',
  templateUrl: './marriage-form.component.html',
  styleUrls: ['./marriage-form.component.css']
})
export class MarriageFormComponent implements OnInit {
  action;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params=>{
        this.action=params['action']

      })
  }

  onSubmit(form){
    console.log(this.action,',',form.value)
  }
}

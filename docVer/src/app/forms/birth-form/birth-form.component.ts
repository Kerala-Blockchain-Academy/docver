import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SawtoothService } from 'src/app/sawtooth.service';

@Component({
  selector: 'app-birth-form',
  templateUrl: './birth-form.component.html',
  styleUrls: ['./birth-form.component.css'],
  providers:[SawtoothService]
})
export class BirthFormComponent implements OnInit {
  action
  constructor(private sawtoothservice:SawtoothService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(params=>{
      this.action=params['action']

    })
  }
  onSubmit(form){
    console.log("In form component")
    this.sawtoothservice.logData(form.value,this.action)
  }

}



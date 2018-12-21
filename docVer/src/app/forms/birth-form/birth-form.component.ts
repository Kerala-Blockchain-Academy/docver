import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
import { SawtoothService } from 'src/app/sawtooth.service';
=======
import { SawtoothService } from 'src/app/sawtooth.service';
import { ActivatedRoute } from '@angular/router';
>>>>>>> 5af1c8371d7b6060a69c0a4bf79325cdfd3c3abc

@Component({
  selector: 'app-birth-form',
  templateUrl: './birth-form.component.html',
  styleUrls: ['./birth-form.component.css'],
  providers:[SawtoothService]
})
export class BirthFormComponent implements OnInit {
<<<<<<< HEAD
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
=======

  private action: String;

  constructor(private addBlock: SawtoothService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.action = params['action'];
    });
  }


  onSubmit(bform) {
    // $event.preventDefault()
    let data = bform.value;
    const imp = [0, 1, 2, 3, 4];
    const docType = 'birthForm';
    data['imp'] = imp;
    data['docType'] = docType;
    const strData = JSON.stringify(data);
    const tmp = JSON.parse(strData);
    const keys = Object.keys(tmp);
    console.log(tmp[keys[imp[0]]]);
    this.addBlock.sendData(this.action, strData);
>>>>>>> 5af1c8371d7b6060a69c0a4bf79325cdfd3c3abc
  }

}



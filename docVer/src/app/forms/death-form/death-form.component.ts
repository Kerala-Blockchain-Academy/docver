import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SawtoothService } from 'src/app/sawtooth.service';

@Component({
  selector: 'app-death-form',
  templateUrl: './death-form.component.html',
  styleUrls: ['./death-form.component.css']
})
export class DeathFormComponent implements OnInit {
  action
  href
  constructor(private route:ActivatedRoute,private addBlock:SawtoothService) { }

  ngOnInit() {
    this.href=this.route.url
    this.action=this.href.value[0].path
    console.log(this.action)
  }

  onSubmit(bform) {
    // $event.preventDefault()
    const data = bform.value;
    const imp = [0, 1, 2, 3, 4];
    const docType = 'deathForm';
    data['imp'] = imp;
    data['docType'] = docType;
    const strData = JSON.stringify(data);
    // const tmp = JSON.parse(strData);
    // const keys = Object.keys(tmp);
    // console.log(tmp[keys[imp[0]]]);
    // this.addBlock.sendData(this.action, strData);
    this.addBlock.register(this.action, strData);
  }

}

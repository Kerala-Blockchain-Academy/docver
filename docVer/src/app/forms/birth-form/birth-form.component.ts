import { Component, OnInit } from '@angular/core';
import { SawtoothService } from 'src/app/sawtooth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-birth-form',
  templateUrl: './birth-form.component.html',
  styleUrls: ['./birth-form.component.css'],
  providers: [SawtoothService]
})
export class BirthFormComponent implements OnInit {

  private action: String;
  private href;

  constructor(private addBlock: SawtoothService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.href=this.route.url
    this.action=this.href.value[0].path
    
    // this.route.params.subscribe(params => {
    //   this.action = params['action'];
    // });
  }


  onSubmit(bform) {
    // $event.preventDefault()
    const data = bform.value;
    const imp = [0, 1, 2, 3, 4];
    const docType = 'birthForm';
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



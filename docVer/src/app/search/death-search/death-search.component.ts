import { Component, OnInit } from '@angular/core';
import { SawtoothService } from 'src/app/sawtooth.service';

@Component({
  selector: 'app-death-search',
  templateUrl: './death-search.component.html',
  styleUrls: ['./death-search.component.css']
})
export class DeathSearchComponent implements OnInit {

  constructor(private search:SawtoothService) { }

  ngOnInit() {
  }


  onSubmit(bform) {
    // $event.preventDefault()
    const data = bform.value;
    const imp = [0, 1, 2, 3, 4];
    const docType = 'deathForm';
    data['imp'] = imp;
    data['docType'] = docType;
    const strData = JSON.stringify(data);
    const path = 'verify';
    this.search.search(strData, path);
  }

}

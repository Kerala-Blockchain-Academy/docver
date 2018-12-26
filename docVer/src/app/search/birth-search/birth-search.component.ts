import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SawtoothService } from 'src/app/sawtooth.service';

@Component({
  selector: 'app-birth-search',
  templateUrl: './birth-search.component.html',
  styleUrls: ['./birth-search.component.css']
})
export class BirthSearchComponent implements OnInit {
  private action
  private address

  constructor( private search:SawtoothService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.action = params['action'];
    });
  }

  onSubmit(bform) {
    // $event.preventDefault()
    const data = bform.value;
    const imp = [0, 1, 2, 3, 4];
    const docType = 'birthForm';
    data['imp'] = imp;
    data['docType'] = docType;
    const strData = JSON.stringify(data);
    const path = 'verify';
    this.search.search(strData, path);
  }

}

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

  constructor( private addBlock:SawtoothService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.action = params['action'];
    });
  }
  


  
}

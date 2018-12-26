import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  docDetails
  constructor(private data:SawtoothService) { }

  ngOnInit() {
    this.docDetails=this.data.getPayload()
    

  }

}

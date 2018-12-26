import { Component, OnInit } from '@angular/core';
import { Doc } from '../model';
import { SawtoothService } from '../sawtooth.service';

@Component({
  selector: 'app-verifyit',
  templateUrl: './verifyit.component.html',
  styleUrls: ['./verifyit.component.css']
})
export class VerifyitComponent implements OnInit {
  private file: any;
  private extension: any;
  private doc: Doc ;
  public isOn1 ;
  public isOn2 ;

  constructor(private verify: SawtoothService) { }

  ngOnInit() {
    this.isOn1 = this.isOn2 = false;
    if (this.verify.verified === 1) {
      this.isOn1 = true;
    }
    if (this.verify.verified === 0) {
      this.isOn2 = true ;
    }
  }

  fileChanged(e) {
    this.file = e.target.files[0];
    this.extension = e.target.files[0].name.split('.').pop().toLowerCase();
  }

  login() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (this.extension === 'json') {
        this.doc = JSON.parse(fileReader.result.toString());
        this.verify.veryfy(this.doc.address, this.doc.data);
      }
    };
    fileReader.readAsText(this.file);
  }

}

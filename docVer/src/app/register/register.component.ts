import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private register: SawtoothService, private http: HttpClient) { }

  ngOnInit() {
  }

  reg(data) {
    const deprt = data.value.regFormDep;
    const id = data.value.regFormId;
    const deprtHash = this.register.hash(deprt).substr(0, 32);
    const idHash = this.register.hash(id).substr(0, 32);
    const key = deprtHash + idHash;
    this.register.setCurrentTransactor(key);
    const keys = {
      pubKey: this.register.publicKey,
      priKey: this.register.privateKey.asHex()
    };
    const keyString = JSON.stringify(keys);
    const keyBlob = new Blob([keyString], {type: 'text/plain;charset=utf-8'});
    saveAs(keyBlob, 'key.json');
  }
}

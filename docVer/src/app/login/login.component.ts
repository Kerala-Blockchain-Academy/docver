import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SawtoothService } from '../sawtooth.service';
import { Key } from '../model';

@Component({
  selector: 'app-login',
    templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable:ElementRef;
  private file: any;
  private extension: any;
  private key: Key;
  constructor(private router: Router, private http: HttpClient, private log: SawtoothService) { }

  ngOnInit() {
    this.log.clearLogin();
  }

fileChanged(e) {
    this.file = e.target.files[0];
    this.extension = e.target.files[0].name.split('.').pop().toLowerCase();
}

login(data) {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    if (this.extension === 'json') {
      this.key = JSON.parse(fileReader.result.toString());
      const deprt = data.value.loginFormDep;
      const id = data.value.loginFormId;
      const deprtHash = this.log.hash(deprt).substr(0, 32);
      const idHash = this.log.hash(id).substr(0, 32);
      const tmpKey = deprtHash + idHash;
      console.log('keys ->', tmpKey, this.key.priKey);
      if ( tmpKey === this.key.priKey) {
        this.log.setCurrentTransactor(this.key.priKey);
        if (this.log.publicKey === this.key.pubKey) {
          console.log('logedin');
          this.log.status=true;
          this.router.navigate(['docList'])
        }
      }
    }
  };
  fileReader.readAsText(this.file);
}



}

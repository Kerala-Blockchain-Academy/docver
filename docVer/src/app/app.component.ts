import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'docVer';
  formType;

  formNow(x){
    this.formType=x.path
    console.log(this.formType)
  }
}

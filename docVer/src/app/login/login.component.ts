import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
    templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('myInput')
  myInputVariable:ElementRef; 
  
  file:any
  constructor(private router: Router,private http:Http) { }

  ngOnInit() {
    this.http.get('./assets/login.json').subscribe((resp) => {
      console.log("resp",resp);
    })
    // buttonClick(event){
      //   event.preventDefault();
      //   console.log("clicked!!!!");
      //   this.http.get("/home/mycomputer/Desktop/arg.json", "{ responseType: 'json' }").subscribe(data => {
      //     console.log(data.text());
      // })
      //   let router = this.router;
      //   router.navigate(['docList'])
    
      //
  }



  // buttonClick(event){
  //   event.preventDefault();
  //   console.log("clicked!!!!");
  //   this.http.get("/home/mycomputer/Desktop/arg.json", "{ responseType: 'json' }").subscribe(data => {
  //     console.log(data.text());
  // })
  //   let router = this.router;
  //   router.navigate(['docList'])

  // }

  reset() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
}
   


}

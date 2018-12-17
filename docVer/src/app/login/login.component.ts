import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  buttonClick(event){
    event.preventDefault();
    console.log("clicked!!!!");
    
    let router = this.router;
    router.navigate(['docList'])
  }

}

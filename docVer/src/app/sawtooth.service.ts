import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SawtoothService {

  logData(action,values){
    console.log(action,JSON.stringify(values),"services")
  }
  constructor() { }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  data="Happy banking with us"
  data2="Enter account number"
  data3="Enter your password"

  acno:any
  psw:any

  constructor(private rout:Router){

  }
  login(){
    console.log(this.acno);
    console.log(this.psw);

    //redirection
    this.rout.navigateByUrl("home")
  }

}

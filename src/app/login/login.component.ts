import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  data="Happy banking with us"
  data2="Enter account number"
  data3="Enter your password"

  
  login(){
    alert("Login clicked")
  }

  acnoChange(event:any){
    console.log(event.target.value);
    
  }

  pswChange(event:any){
    console.log(event.target.value);
    
  }

}

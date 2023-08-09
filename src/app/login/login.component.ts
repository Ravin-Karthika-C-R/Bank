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

  
  login(a:any,b:any){
    console.log(a.value);
    console.log(b.value);
    
    
    // alert("Login clicked")
  }

}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../bankService/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  acno: any
  psw: any

  loginForm = this.fbs.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })

  data = "Happy banking with us"
  data2 = "Enter account number"
  data3 = "Enter your password"

  constructor(private rout: Router, private fbs: FormBuilder, private ds: DataService) {

  }
  login() {
    var path = this.loginForm.value
    var acno = path.acno
    var psw = path.psw


    if (this.loginForm.valid) {
      this.ds.loginCreate(acno, psw).subscribe({
        next: (result: any) => {

          //to store acno in localstorage
          localStorage.setItem('CurrentAcc',JSON.stringify(acno))
          //store uname
          localStorage.setItem("currentUname",result.currentUser)
          //store token
          localStorage.setItem("token",JSON.stringify(result.token))

          alert(result.message)
          this.rout.navigateByUrl("home")
        },
        error: (result: any) => {
          alert(result.error.message)
        }
      })
    }
    else{
      alert('invalid')
    }
  }

  signup() {
    this.rout.navigateByUrl("")
  }
}

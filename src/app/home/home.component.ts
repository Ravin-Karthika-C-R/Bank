import { Component, OnInit } from '@angular/core';
import { DataService } from '../bankService/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: any = ""
  sdata: any
  acno: any = ""
  balance: any = ""
  message:any=""
  msgClr:any=true
  dAcno:any=""


  moneyTransferForm = this.fb.group({
    rAcno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],

  })


  constructor(private ds: DataService, private fb: FormBuilder,private dp: DatePipe,private rout:Router) {

  }

  ngOnInit(): void {
    //check data in localstorage
    if (localStorage.getItem("currentUname")) {
      this.name = localStorage.getItem("currentUname")
    }

    //login or not
    if(!localStorage.getItem("CurrentAcc")){
      this.rout.navigateByUrl("")
      alert("Please login first")
    }
  }


  //create function for getbalance
  getbalance() {
    //Now store acno in local storage
    if (localStorage.getItem("CurrentAcc")) {
      this.acno = JSON.parse(localStorage.getItem("CurrentAcc") || "")

      //balance
      this.ds.getBalanceApi(this.acno).subscribe({
        next: (result: any) => {
          console.log(this.balance);

          this.balance = result.message
          

        },
        error: (result: any) => {
          alert(result.error.message)

        }
      })
    }
  }


 
  //moneyTransfer
  moneyTransfer() {
    if (this.moneyTransferForm.valid) {
      var path = this.moneyTransferForm.value
      var rAcno = path.rAcno
      var psw = path.psw
      var amount = path.amount

      // console.log(rAcno);

      //sender acno
      if(localStorage.getItem("CurrentAcc")){
        this.acno = JSON.parse(localStorage.getItem("CurrentAcc") || "")
        // console.log(this.acno);
      }

      //date
      const date=new Date()
      // console.log(date);

      var latestDate=this.dp.transform(date,'medium')
      // console.log(latestDate);

      if(this.acno==rAcno){
        // alert('Sender account number and receiver account number are same')
        this.message="Sender and receiver account number are same"
        this.msgClr=false
      }
      else{
        //api
        this.ds.MoneyTransferApi(this.acno,rAcno,psw,amount,latestDate).subscribe({ //order of the data is important
          next:(result:any)=>{
            // alert(result.message)
            this.message=result.message
            this.msgClr=true
          },
          error:(result:any)=>{
            // alert(result.error.message)
            this.message=result.error.message
            this.msgClr=false
          }

        })

      }
      

    }
    else {
      // alert('invalid form')
      this.message="Invalid form"
      this.msgClr=false
    
    }
  }

  //logout
  logout(){
      localStorage.removeItem("CurrentAcc")
      localStorage.removeItem("currentUname")
      this.rout.navigateByUrl("")
  }

  //delete account

  deleteActive(){
    if(localStorage.getItem("CurrentAcc")){
      this.dAcno=JSON.parse(localStorage.getItem("CurrentAcc")||"")
      console.log(this.dAcno);
      
    }
  }

  //cancel
  cancelp(){
    this.dAcno=""
  }

  
  yesDelete(event:any){
    // alert("delete api call")
    // console.log(event);  //acno
    this.ds.accountDeleteApi(event).subscribe({
      next:(data:any)=>{
        alert(data.message)
        this.logout()  //to delete both user name and acno the removeitem code is already set in logout() so no need to rewrite the code just give the logout()
      }
    })
    
  }

}

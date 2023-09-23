import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl:any="https://bank-server-ahj5.onrender.com"

  constructor(private http:HttpClient) { }

  // data="Data inside service file"
  // serviceMethod(){
  //   alert("service method")
  // }

  getToekn(){

    //create a header token 
    const headers=new HttpHeaders()
    //get token from localstorage
    if(localStorage.getItem("token")){
      const token=JSON.parse(localStorage.getItem("token") || "")
      options.headers=headers.append("access_token",token)
    }
    return options
  }

  //api to create account
  accountCreate(acno:any, psw:any, uname:any){
    const bodyData={acno,psw,uname}
    return this.http.post(`${this.baseUrl}/bankuser/create_acc`,bodyData)
  }

  //api to login 
  loginCreate(acno:any, psw:any){
    const bodyData1={acno,psw}
    return this.http.post(`${this.baseUrl}/bankuser/login`,bodyData1)
  }

  //api to get balance
  getBalanceApi(acno:any){
    return this.http.get(`${this.baseUrl}/bankuser/balance/${acno}`,this.getToekn())
  }

  //api to money transfer
  MoneyTransferApi(sAcno:any, rAcno:any, psw:any, amount:any, date:any){ //these are the variables that given in thunderclient request
    const bodyData={sAcno,rAcno,psw,amount,date}
    return this.http.post(`${this.baseUrl}/bankuser/money-transfer`,bodyData,this.getToekn())
  }

  //api accountstatement

  getAccountStatement(acno:any){
    return this.http.get(`${this.baseUrl}/bankuser/account-statement/${acno}`,this.getToekn())
  }

  //api to delete account
  accountDeleteApi(acno:any){
    return this.http.delete(`${this.baseUrl}/bankuser/delete-account/${acno}`,this.getToekn())
  }

}

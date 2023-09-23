import { Component } from '@angular/core';
import { DataService } from '../bankService/data.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  acno:any
  transactionArray:any=[]
  spinner:any=true
  date:any=""
  searchTerm:any=""

  constructor(private ds: DataService) {

  }

  ngOnInit(): void {

    if (localStorage.getItem("CurrentAcc")) {
      this.acno = JSON.parse(localStorage.getItem("CurrentAcc") || "")
          // console.log(this.acno);
      this.ds.getAccountStatement(this.acno).subscribe({
        next: (result: any) => {
          this.transactionArray = result.message
          console.log(this.transactionArray);
          
        }
      })
    }

    setTimeout(()=>{
      this.spinner=false
    },2000)

    this.date=new Date()
    
  }
  //Function for credit,all,debit
  filterData(search:any){
    this.searchTerm=search
  }

  //download stament
  pdfExport(){

    //create an object for class jsPDF
    var pdf=new jsPDF()

    //set columns
    let col=['type','amount','account number','date']

    //set row
    let row=[]

    //style
    pdf.setFontSize(16)
    pdf.text("Account Statement",15,10)
    pdf.setFontSize(12)
    pdf.setTextColor('blue')

    //array of array - nested array
    var allDataArray=this.transactionArray
    for(let i of allDataArray){
      let rowData=[i.type,i.amount,i.tacno,i.date]
      row.push(rowData)
    }
    //convert to pdf as table
    (pdf as any).autoTable(col,row,{startY:15})

    //open converted pdf in new tab
    pdf.output('dataurlnewwindow')

    //download and save 
    pdf.save('accountStatemt.pdf')
  }
}

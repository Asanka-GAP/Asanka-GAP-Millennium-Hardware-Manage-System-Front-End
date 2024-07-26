import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  constructor(private http:HttpClient){
    this.loadTable();
  }

  customerObj = {
    id:undefined,
    name:"",
    city:"",
    contact:""
  }

  public customerList:any;

  saveCustomer(){
    if (
      this.customerObj.name!="" && this.customerObj.city!="" && 
      this.customerObj.contact!="") {
      this.http.post("http://localhost:8080/customer",this.customerObj).subscribe(
        res =>{
          Swal.fire({
            title: "Added Successfully!",
            text: "Customer Added Successfully",
            icon: "success",
      preConfirm:()=>{
        window.location.reload()
      }
          });
        }
      )
    }else{
      Swal.fire({
        title: "Something Missing!",
        text: "Please check your form",
        icon: "error"
      });
    }
  }

  loadTable(){
    this.http.get("http://localhost:8080/customer/get-all").subscribe(
      (res)=>{
        this.customerList=res;
      }
    )
  }

  
updateCustomer(customer: any) {
  
  Swal.fire({
    title: "Update Details",
    html: `
          <input class="swal2-input" value=${customer.name} placeholder="First Name" id="name">
          <input class="swal2-input" value=${customer.city} placeholder="Last Name" id="city">
          <input class="swal2-input" value=${customer.contact} placeholder="Age" id="contact">
        `,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      
      const name=document.getElementById("name") as HTMLInputElement;
      const city=document.getElementById("city") as HTMLInputElement;
      const contact=document.getElementById("contact") as HTMLInputElement;

      this.customerObj.id=customer.id;
      this.customerObj.name=name.value;
      this.customerObj.city=city.value;
      this.customerObj.contact=contact.value;
      if (
        this.customerObj.name == "" ||
        this.customerObj.city == "" ||
        this.customerObj.contact == ""
      ) {
        Swal.fire({
          title: "Something Missing!",
          text: "Opps, something Missing. Please check your form",
          icon: "error",
          preConfirm: () => {
            this.updateCustomer(customer);
          },
        });
      } else {
        this.http.put("http://localhost:8080/customer/update",this.customerObj).subscribe(
          res=>{
            Swal.fire({
              title: "Updated Successfully!",
              text: "You clicked the button!",
              icon: "success",
        preConfirm:()=>{
          window.location.reload()
        }
            });
          }
        )
      }
    },
  });

  }

  deleteCustomer(id:number){
    Swal.fire({
      title: "Warning!",
      text: "Are you sure want to delete?",
      icon: "warning",
      showConfirmButton:true,
      showCancelButton:true,

    }).then(res=>{
      if (res.isConfirmed) {
        this.http.delete(`http://localhost:8080/customer/delete/${id}`).subscribe(
          res=>{
            Swal.fire({
              title: "Deleted Successfully!",
              text: "Customer deleted Successfully",
              icon: "success",
        preConfirm:()=>{
          window.location.reload()
        }
            });
          }
        )
      }
    });
  }
}

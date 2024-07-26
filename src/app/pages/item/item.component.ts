import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  constructor(private http:HttpClient){
    this.loadItemTable();
  }

  public itemObj={
    id:undefined,
    name:"",
    rentalPerDay:0,
    finePerDay:0,
    availability:""
    }

    public itemList:any;

    addItem(){
      this.http.post("http://localhost:8080/item",this.itemObj).subscribe(
          res =>{
            Swal.fire({
              title: "Added Successfully!",
              text: "Item Added Successfully",
              icon: "success",
        preConfirm:()=>{
          window.location.reload()
        }
            });
          }
        )
    }

    loadItemTable(){
this.http.get("http://localhost:8080/item/get-all").subscribe(
      (res)=>{
        this.itemList=res;
      }
    )
    }

    updateItem(item: any) {
  
      Swal.fire({
        title: "Update Details",
        html: `
              <input type="text" class="swal2-input" value=${item.name} placeholder="Name" id="name">
              <input class="swal2-input" type="number" value=${item.rentalPerDay} placeholder="Rental Per Day" id="rpd">
              <input class="swal2-input" type="number" value=${item.finePerDay} placeholder="Fine Per Day" id="fpd">
              <input type="text" class="swal2-input" value=${item.availability} placeholder="Name" id="avb">
            `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          
          const name=document.getElementById("name") as HTMLInputElement;
          const rpd=document.getElementById("rpd") as HTMLInputElement;
          const fpd=document.getElementById("fpd") as HTMLInputElement;
          const availability=document.getElementById("avb") as HTMLInputElement;
          
    
          this.itemObj.id=item.id;
          this.itemObj.name=name.value;
          this.itemObj.rentalPerDay=parseFloat(rpd.value);
          this.itemObj.finePerDay=parseFloat(fpd.value);
          this.itemObj.availability=availability.value;
          if (
            this.itemObj.name == "" ||
            this.itemObj.availability == "" ||
            this.itemObj.rentalPerDay<=0 ||
            this.itemObj.finePerDay<=0
          ) {
            Swal.fire({
              title: "Something Missing!",
              text: "Opps, something Missing. Please check your form",
              icon: "error",
              preConfirm: () => {
                this.updateItem(item);
              },
            });
          } else {
            this.http.put("http://localhost:8080/item/update",this.itemObj).subscribe(
              res=>{
                Swal.fire({
                  title: "Updated Successfully!",
                  text: "Item Updated Successfully!",
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

      deleteItem(id:number){
        Swal.fire({
          title: "Warning!",
          text: "Are you sure want to delete?",
          icon: "warning",
          showConfirmButton:true,
          showCancelButton:true,
    
        }).then(res=>{
          if (res.isConfirmed) {
            this.http.delete(`http://localhost:8080/item/delete/${id}`).subscribe(
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

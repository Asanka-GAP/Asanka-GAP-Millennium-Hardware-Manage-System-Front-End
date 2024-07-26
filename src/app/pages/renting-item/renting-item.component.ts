import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-renting-item',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './renting-item.component.html',
  styleUrl: './renting-item.component.css'
})
export class RentingItemComponent {
  constructor(private http:HttpClient){}

  rentalItem={
    rentalId:undefined,
    itemId:undefined
  }

  public itemList:any;
public rentalList:any;


loadDropDown(){
  this.http.get('http://localhost:8080/rental/get-all').subscribe((res) => {
    this.rentalList = res;
  });
  this.http.get("http://localhost:8080/item/get-all").subscribe(
    (res)=>{
      this.itemList=res;
    })
}

  assginItem(){

  }

}

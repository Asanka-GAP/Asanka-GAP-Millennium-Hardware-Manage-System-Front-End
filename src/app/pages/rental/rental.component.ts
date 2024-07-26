import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent {
  constructor(private http:HttpClient){}

  public rentalObj={
    id:undefined,
    rentalDate:"",
    returnDate:"",
    dueDate:"",
    totalCost:0,
    fine:0
  }

}

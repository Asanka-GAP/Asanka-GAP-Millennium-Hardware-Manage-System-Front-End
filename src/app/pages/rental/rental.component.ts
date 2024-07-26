import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css',
})
export class RentalComponent {
  constructor(private http: HttpClient) {
    this.loadRentalTable();
  }

  public rentalObj = {
    id: undefined,
    rentalDate: '',
    returnDate: '',
    dueDate: '',
    totalCost: 0,
    fine: 0,
  };

  public rentalList: any;

  addRental() {
    this.http
      .post('http://localhost:8080/rental', this.rentalObj)
      .subscribe((res) => {
        Swal.fire({
          title: 'Added Successfully!',
          text: 'Item Added Successfully',
          icon: 'success',
          preConfirm: () => {
            window.location.reload();
          },
        });
      });
  }

  loadRentalTable() {
    this.http.get('http://localhost:8080/rental/get-all').subscribe((res) => {
      this.rentalList = res;
    });
  }

  updateRental(rental: any) {
    Swal.fire({
      title: 'Update Details',
      html: `<div class="row">
      <div class="col pt-4">
      
      <lable>Rental Date</lable>
      </div>
      <div class="col">
      <input type="date" class="swal2-input" value=${rental.rentalDate} id="rentD">
                  
      </div>

      </div>
      <div class="row"><div class="col pt-4">
      
      <lable>Return Date</lable>
      </div>
      <div class="col">
      <input class="swal2-input" type="date" value=${rental.returnDate} id="rtD">
           
      </div>
      </div>

      <div class="row"><div class="col pt-4">
      
      <lable>Due Date</lable>
      </div>
      <div class="col">
      <input class="swal2-input" type="date" value=${rental.dueDate} id="dD">
      </div>
      </div>

      <div class="row"><div class="col pt-4">
      
      <lable>Total Cost</lable>
      </div>
      <div class="col">
      <input type="number" class="swal2-input" value=${rental.totalCost} id="totalCost">
                  </div>
      </div>

      <div class="row"><div class="col pt-4">
      
      <lable>Fine</lable>
      </div>
      <div class="col">
       <input type="number" class="swal2-input" value=${rental.fine} id="fine">
                  </div>
      </div>
                `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const rentalDate = document.getElementById('rentD') as HTMLInputElement;
        const returnDate = document.getElementById('rtD') as HTMLInputElement;
        const dueDate = document.getElementById('dD') as HTMLInputElement;
        const totalCost = document.getElementById(
          'totalCost'
        ) as HTMLInputElement;
        const fine = document.getElementById('fine') as HTMLInputElement;

        this.rentalObj.rentalDate = rentalDate.value;
        this.rentalObj.returnDate = returnDate.value;
        this.rentalObj.dueDate = dueDate.value;
        this.rentalObj.totalCost = parseFloat(totalCost.value);
        this.rentalObj.fine = parseFloat(fine.value);
        this.rentalObj.id = rental.id;
        if (
          this.rentalObj.rentalDate == '' ||
          this.rentalObj.returnDate == '' ||
          this.rentalObj.dueDate == '' ||
          this.rentalObj.totalCost <= 0 ||
          this.rentalObj.fine < 0
        ) {
          Swal.fire({
            title: 'Something Missing!',
            text: 'Opps, something Missing. Please check your form',
            icon: 'error',
            preConfirm: () => {
              this.updateRental(rental);
            },
          });
        } else {
          this.http
            .put('http://localhost:8080/rental/update', this.rentalObj)
            .subscribe((res) => {
              Swal.fire({
                title: 'Updated Successfully!',
                text: 'Rental Updated Successfully!',
                icon: 'success',
                preConfirm: () => {
                  window.location.reload();
                },
              });
            });
        }
      },
    });
  }

  deleteRental(id: number) {
    Swal.fire({
      title: 'Warning!',
      text: 'Are you sure want to delete?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        this.http
          .delete(`http://localhost:8080/rental/delete/${id}`)
          .subscribe((res) => {
            Swal.fire({
              title: 'Deleted Successfully!',
              text: 'Rental deleted Successfully',
              icon: 'success',
              preConfirm: () => {
                window.location.reload();
              },
            });
          });
      }
    });
  }
}

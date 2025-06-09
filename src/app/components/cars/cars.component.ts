import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Car, CARS } from '../../models/car';
import { map, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';
import { Router, RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers: [CarService],
  imports: [FormsModule, ImageLoaderComponent, RouterLink, CommonModule],
})
export class CarsComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  carService = inject(CarService);
  router = inject(Router);

  carSubscription: Subscription = new Subscription();
  handler: any = null;

  bookedCarId = 0;

  currentPage = 1;
  itemsPerPage = 20;
  totalPages?: number;
  totalPagesArr: number[] = [];
  paginatedCars: Car[] = [];

  bookingError = '';
  toastCounter = 0;

  constructor() {}

  sortValue = '';

  ngOnInit() {
    this.loadStripe();
    this.carSubscription = this.carService
      .getCars()
      .pipe(
        map((cars) => {
          this.cars = cars.data;
          this.paginate(this.itemsPerPage);
          this.calcTotalPages();
        })
      )
      .subscribe();
    // this.cars = CARS;
    // this.paginate(this.itemsPerPage);
    // this.calcTotalPages();
  }

  sortCars(sortBy: string) {
    switch (sortBy) {
      case 'Model':
        this.paginatedCars.sort((car1, car2) => {
          return car1.model > car2.model ? 1 : car1.model < car2.model ? -1 : 0;
        });
        break;
      case 'Year':
        this.paginatedCars.sort((car1, car2) => {
          return car1.year > car2.year ? 1 : car1.year < car2.year ? -1 : 0;
        });
        break;
      case 'PriceLTH':
        this.paginatedCars.sort((car1, car2) => {
          return car1.price > car2.price ? 1 : car1.price < car2.price ? -1 : 0;
        });
        break;
      case 'PriceHTL':
        this.paginatedCars.sort((car1, car2) => {
          return car1.price > car2.price ? -1 : car1.price < car2.price ? 1 : 0;
        });
        break;

      default:
        this.paginatedCars.sort((car1, car2) => {
          return car1.id > car2.id ? 1 : car1.id < car2.id ? -1 : 0;
        });
        break;
    }
  }

  paginate(numOfItems: number, reset?: boolean) {
    if (reset) {
      this.changePage(1);
    }
    this.itemsPerPage = numOfItems;
    const start = numOfItems * (this.currentPage - 1);
    this.paginatedCars = this.cars.slice(start, start + numOfItems);
    this.calcTotalPages();
  }

  calcTotalPages(): void {
    this.totalPages = Math.ceil(this.cars.length / this.itemsPerPage);

    this.totalPagesArr = Array.from(
      { length: this.totalPages },
      (_, i) => 1 + i
    );
  }

  changePage(pageNum: number) {
    this.currentPage = pageNum;
    this.paginate(this.itemsPerPage);
  }

  pay(car: Car) {
    if (!localStorage.getItem('id')) {
      this.router.navigate(['/login']);
    }

    const amount = car.deposit_amount;
    const model = car.model;
    const year = car.year;
    const id = car.id;
    const isBooked = car.is_booked;
    const isSold = car.is_sold;

    let toastBox = document.getElementById('toastBox');
    let toast = document.createElement('div');

    if (this.toastCounter < 3) {
      if (!isBooked && !isSold) {
        var handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: function (token: any) {
            const user_id = localStorage.getItem('id');
            const http = new HttpClient(
              new HttpXhrBackend({
                build: () => new XMLHttpRequest(),
              })
            );
            const baseUrl = environment.apiUrl + 'book/';

            http
              .post(baseUrl + id, { user_id: user_id, amount: amount })
              .subscribe({
                next: () => {
                  this.toastCounter++;
                  toast.classList.add('toast');
                  toast.innerHTML =
                    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#008000" stroke-width="1.5"></circle> <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#008000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
                  toast.innerHTML += 'Car booked successfully';
                  toastBox?.appendChild(toast);
                  setTimeout(() => {
                    toast.remove();
                    this.toastCounter--;
                  }, 2300);
                },
                error: () => {
                  this.toastCounter++;
                  toast.classList.add('toast');
                  toast.classList.add('toast-error');
                  toast.innerHTML =
                    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#ff0000" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>';
                  toast.innerHTML += 'Issue with API';
                  toastBox?.appendChild(toast);
                  setTimeout(() => {
                    toast.remove();
                    this.toastCounter--;
                  }, 2300);
                },
              });
          },
        });

        handler.open({
          name: model,
          description: year.toString(),
          amount: amount * 100,
          currency: 'egp',
        });
      } else {
        this.toastCounter++;
        toast.classList.add('toast');
        toast.classList.add('toast-error');
        toast.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#ff0000" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ff0000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>';
        toast.innerHTML += 'This car is not available for booking';
        toastBox?.appendChild(toast);
        setTimeout(() => {
          toast.remove();
          this.toastCounter--;
        }, 2300);
      }
    }
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: function (token: any) {
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }

  ngOnDestroy(): void {
    this.carSubscription.unsubscribe();
  }
}

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { map, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';
import { RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers: [CarService],
  imports: [FormsModule, ImageLoaderComponent, RouterLink],
})

export class CarsComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  carService = inject(CarService);
  carSubscription: Subscription = new Subscription();

  constructor() {}

  sortValue = '';

  ngOnInit() {
    this.carSubscription = this.carService
      .getCars()
      .pipe(
        map((cars) => {
          this.cars = cars.data;
        })
      )
      .subscribe();
  }
  
  ngOnDestroy(): void {
    this.carSubscription.unsubscribe();
  }
}

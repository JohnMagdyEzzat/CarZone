import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './models/car';
import { map } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers: [
    CarService,
    {
      provide: '30px',
      useValue: {
        placeholderResolution: 40,
      },
    },
  ],
  imports: [NgOptimizedImage],
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  constructor(public carService: CarService) {}

  ngOnInit() {
    this.carService
      .getCars()
      .pipe(
        map((cars) => {
          this.cars = cars.data;
          console.log(this.cars);
        })
      )
      .subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './models/car';
import { map } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers: [CarService],
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  constructor(public carService: CarService) {}

  ngOnInit() {
    this.carService
      .getCars()
      .pipe(
        map((cars) => {
          this.cars = cars;
        })
      )
      .subscribe();
    console.log(this.cars);
  }
}

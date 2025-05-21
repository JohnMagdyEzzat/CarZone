import { Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { Car } from './models/car';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ImageLoaderComponent } from '../image-loader/image-loader.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers: [CarService],
  imports: [FormsModule, ImageLoaderComponent],
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  constructor(public carService: CarService) {}

  sortValue = '';

  ngOnInit() {
    this.carService
      .getCars()
      .pipe(
        map((cars) => {
          this.cars = cars.data;
        })
      )
      .subscribe();
  }
}

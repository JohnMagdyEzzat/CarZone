import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Car } from '../cars/models/car';
import { CarService } from '../cars/services/car.service';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from "../image-gallery/image-gallery.component";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
  imports: [RouterLink, CommonModule, ImageGalleryComponent],
})
export class CarDetailsComponent implements OnInit {
  private readonly carServices = inject(CarService);
  private readonly route = inject(ActivatedRoute);

  car: Car | undefined;
  constructor() {}

  ngOnInit() {
    const id = this.route.snapshot.params['carId'];
    this.carServices.getCarById(id).subscribe((car) => {
      this.car = car.data;
    });
  }

  purchaseCar() {}
}

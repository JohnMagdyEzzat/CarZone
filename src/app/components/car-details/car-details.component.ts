import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { EgpCurrencyPipe } from '../../pipes/egp-currency.pipe';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
  imports: [RouterLink, CommonModule, ImageGalleryComponent, EgpCurrencyPipe],
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

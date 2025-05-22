import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map-display',
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.css',
})
export class MapDisplayComponent {
  options: google.maps.MapOptions = {
    center: { lat: 30, lng: 31 },
    zoom: 5,
  };
}

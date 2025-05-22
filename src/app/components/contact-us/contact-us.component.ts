import { Component, OnInit } from '@angular/core';
import { MapDisplayComponent } from '../map-display/map-display.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  imports: [MapDisplayComponent],
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

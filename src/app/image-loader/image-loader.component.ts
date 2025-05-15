import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css'],
  imports: [CommonModule],
})
export class ImageLoaderComponent implements OnInit {
  @Input({ required: true }) imageSource: any;
  @Input({ required: true }) carModel!: string;

  isLoaded = false;

  constructor() {}
  ngOnInit() {}

  onImageLoad() {
    console.log('t');
    
    this.isLoaded = true;
  }
}

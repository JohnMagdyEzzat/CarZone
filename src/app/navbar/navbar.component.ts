import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarContainer', { static: true }) navbarContainer!: ElementRef;
  constructor() {}

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number > 300) {
      this.navbarContainer.nativeElement.classList.add('black-nav');;
    }else{
      this.navbarContainer.nativeElement.classList.remove('black-nav');;
    }
  }
}

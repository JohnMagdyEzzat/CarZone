import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink, RouterLinkActive],
  providers: [],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarContainer', { static: true }) navbarContainer!: ElementRef;
  router = inject(Router);
  constructor() {}

  ngOnInit() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.router.url === '/') {
      const navbarClassList = this.navbarContainer.nativeElement.classList;
      const number =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (number > 300) {
        navbarClassList.add('black-nav');
        navbarClassList.add('transition-04');
      } else {
        navbarClassList.remove('black-nav');
        navbarClassList.remove('transition-04');
      }
    }
  }
}

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerService } from './services/spinner.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'CarZone';
  spinnerServices = inject(SpinnerService);
  cdref = inject(ChangeDetectorRef);
  showSpinner = false;
  spinnerCounterSub!: Subscription;

  ngAfterViewInit(): void {
    this.spinnerCounterSub = this.spinnerServices.spinnerCounter$.subscribe(
      (counter) => {
        this.showSpinner = counter > 0;
        this.cdref.detectChanges();
      }
    );
  }
  ngOnDestroy(): void {
    this.spinnerCounterSub.unsubscribe();
  }
}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { CarsComponent } from './cars/cars.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'car-details/:carId', component: CarDetailsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: '', component: HomeComponent },
];

import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './about/about.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './our-services/services.component';
import { CarsComponent } from './cars/cars.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'car-details/:carId', component: CarDetailsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '**', component: HomeComponent },
];

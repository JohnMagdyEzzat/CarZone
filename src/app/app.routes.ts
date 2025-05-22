import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/our-services/services.component';
import { CarsComponent } from './components/cars/cars.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/:carId', component: CarDetailsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '**', component: HomeComponent },
];

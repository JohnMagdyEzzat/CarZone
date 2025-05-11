import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiURL = 'https://sunny-macaque-arguably.ngrok-free.app/api/cars';
  constructor(public http: HttpClient) {}
  public getCars(): Observable<{ data: Car[] }> {
    let defaultHeaders = new HttpHeaders();
    defaultHeaders = defaultHeaders.set('ngrok-skip-browser-warning', '69420');
    return this.http.get<{data: Car[]}>(this.apiURL, { headers: defaultHeaders });
  }
}

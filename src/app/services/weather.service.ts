import { Injectable } from '@angular/core';

import { API } from '../api/variable.env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/WeatherData';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey: string | undefined = '';
  private weatherData: WeatherData | any;

  constructor
    (private http: HttpClient) {
    this.apiKey = API.apiKey;
  }


  //Function to return a API_URL with a 'cityData' to params anda 'apiKey' integreted
  getWeatherData(cityData: string): Observable<WeatherData> {

    //get for a new weather data
    return this.weatherData =
      this.http.get<WeatherData>
        (`https://api.openweathermap.org/data/2.5/weather?q=${cityData}&appid=${this.apiKey}&units=metric&lang=pt_br`);
  }

}

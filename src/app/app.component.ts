import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

import weather_code from '../assets/data/weather_code.json';
import { SearchCityService } from './services/search-city.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Weather API'

  background: string = '';

  constructor(
    private service: WeatherService,
    private search: SearchCityService) { }


  ngOnInit() {

    this.search.currentCityName.subscribe(cityName => {
      if (cityName) {
        this.getCurrentCity(cityName,
          this.search.currentLanguage.subscribe(language => {
            if (language) this.returnCL(language)
          }))
      }
    })
  }

  returnCL(cl: any) {
    return cl;
  }

  getCurrentCity(currentCity: string, currentLang: string | any) {
    this.service.getWeatherData(currentCity, currentLang).subscribe({
      next: (res) => {
        const backgroud = this.changeBackground(res.weather[0].icon);
        this.background = backgroud ? `center/cover url("${backgroud}")` : 'none';
      },
      error: () => this.background = 'none'
    });
  }

  changeBackground(currentWeatherCode: string): any {
    if (currentWeatherCode) {
      const path = weather_code.find((item: any) => item.code === currentWeatherCode);
      console.log(path?.code)
      return path?.path;
    }
  }
}



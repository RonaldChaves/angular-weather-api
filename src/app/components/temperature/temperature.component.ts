import { Component, OnInit } from '@angular/core';
import { TemperatureData } from '../../models/tempData';
import { WeatherService } from '../../services/weather.service';
import { SearchCityService } from '../../services/search-city.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.css'
})
export class TemperatureComponent implements OnInit {

  temp: TemperatureData = {
    main: {
      temp: 0,
      feels_like: 0,
      temp_max: 0,
      temp_min: 0
    },
    weather: [{
      description: "  ",
      icon: ''
    }]
  }
  constructor(
    private service: WeatherService,
    private search: SearchCityService) {

  }

  ngOnInit() {
    //This change the city name with Observable()
    this.search.currentCityName.subscribe((cityName: string) => {
      if (cityName) {

        this.getTemp(cityName,
          this.search.currentLanguage
            .subscribe(lang => {
              if (lang) this.getTemp(cityName, lang)
            }));
      }
    });
  }

  // Method for return a current language
  getLang(cL: string) {
    return cL;
  }

  getTemp(citySearch: string, currentLanguage: string | any) {
    let t: any = this.temp;

    this.service.getWeatherData(citySearch, currentLanguage).subscribe({
      next: (res) => {
        t.main.temp = res.main.temp,
          t.main.feels_like = res.main.feels_like,
          t.main.temp_max = res.main.temp_max,
          t.main.temp_min = res.main.temp_min,
          t.weather[0].description = res.weather[0].description,
          t.weather[0].icon = this.getIconWeather(res.weather[0].icon)
      } 
    })
  }

  getIconWeather(currentIcon: string) {
    const iconURL: string = `https://openweathermap.org/img/wn/${currentIcon}@2x.png`;

    return iconURL;
  }

}

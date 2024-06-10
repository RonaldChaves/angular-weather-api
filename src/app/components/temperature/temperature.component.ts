import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
    weather: {
      description: ''
    },
    main: {
      temp: 0,
      feels_like: 0,
      temp_max: 0,
      temp_min: 0
    }
  }
  constructor(
    private service: WeatherService,
    private search: SearchCityService) {

  }

  ngOnInit() {
    this.getTemp('itaoca');

    //This change the city name with Observable()
    this.search.currentCityName.subscribe((cityName: string) => {
      if (cityName) {
        this.getTemp(cityName);
      }
    });
  }


  getTemp(citySearch: string) {
    var t: any = this.temp;

    this.service.getWeatherData(citySearch).subscribe({
      next: (res) => {
        t.main.temp = res.main.temp,
          t.main.feels_like = res.main.feels_like,
          t.main.temp_max = res.main.temp_max,
          t.main.temp_min = res.main.temp_min,
          t.weather.description = res.weather[0].descripiton
      },
      error: (err) => { alert('not found') }
    })
  }

}

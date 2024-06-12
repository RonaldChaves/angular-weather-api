import { Component, OnInit } from '@angular/core';
import { WindData } from '../../models/windData';
import { WeatherService } from '../../services/weather.service';
import { SearchCityService } from '../../services/search-city.service';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrl: './wind.component.css'
})
export class WindComponent implements OnInit {
  transformDegree: string = '';

  wind: WindData = {
    wind: {
      speed: 0,
      deg: 0
    }
  }

  constructor(
    private service: WeatherService,
    private search: SearchCityService) { }

  ngOnInit(): void {
    this.getDetails('itaoca'); // Default city

    this.search.currentCityName.subscribe(cityName => {
      if (cityName) this.getDetails(cityName)
    });
  }

  getDetails(cityName: string) {
    this.service.getWeatherData(cityName, 'pt_br').subscribe({
      next: (res) => {
        this.wind.wind.speed = res.wind.speed,
          this.wind.wind.deg = res.wind.deg
      },
      error: (err) => alert('Not Found')
    });
  }

  getDegreeStyle(currentDegree: number) {
    this.transformDegree = `rotate(${currentDegree}deg)`;

    return this.transformDegree;
  }

}

import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';
import { CityData } from '../../models/cityData';
import { SearchCityService } from '../../services/search-city.service';
import { HomeComponent } from '../../pages/home/home.component';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
  providers: [HomeComponent]
})
export class CityComponent implements OnInit {

  countryBagde: any;

  city: CityData = {
    name: '',
    country: '',
    countryCode: '',
    coord: {
      lon: 0,
      lat: 0
    }
  };

  constructor(
    private service: WeatherService,
    private search: SearchCityService) { }

  ngOnInit(): void {
    // Default city
    this.getCity('itaoca');

    // Inscreva-se no Observable para ouvir mudanças no cityName
    this.search.currentCityName.subscribe((cityName: string) => {
      if (cityName) {
        this.getCity(cityName);
      }
    });
  }

  getCity(citySearch: string) {
    this.service.getWeatherData(citySearch).subscribe({
      next: (res) => {
        this.city = {
          name: res.name,
          country: res.sys.country,
          countryCode: res.sys.country,
          coord: {
            lon: res.coord.lon,
            lat: res.coord.lat
          }
        };
      },
      error: () => alert('City not found!') //I'll create a pagefor err 404 'not found'
    });
  }

}

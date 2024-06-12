import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../services/weather.service';
import { CityData } from '../../models/cityData';
import { SearchCityService } from '../../services/search-city.service';
import { HomeComponent } from '../../pages/home/home.component';

// json with all countries name
import cities_name from "../../../assets/data/cities_name.json";


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
    countryBadge: '',
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
    this.getCity('itaoca', 'pt_br');

    // Inscreva-se no Observable para ouvir mudanças no cityName
    this.search.currentCityName.subscribe((cityName: string) => {
      if (cityName) {

        this.getCity(cityName,
          this.search.currentLangauge
            .subscribe(lang => {
              if (lang) this.getLang(lang)
            }));
      }
    });

  }

  getLang(cL: string) {
    return cL;
  }

  getCity(citySearch: string, currentLanguage: any) {
    this.service.getWeatherData(citySearch, currentLanguage).subscribe({
      next: (res) => {
        this.city = {
          name: res.name,
          country: this.getCompleteNameCountry(this.city.countryCode),
          countryCode: res.sys.country,
          countryBadge: this.getCurrentBadge(this.city.countryCode),
          coord: {
            lon: res.coord.lon,
            lat: res.coord.lat
          }
        };
      },
      error: () => alert('City not found!') //I'll create a pagefor err 404 'not found'
    });
  }


  // this change a country code (example: BR) to a complete name of current country 
  //(return 'Brasil' or 'Brazil') but it's only in portuguese.

  getCompleteNameCountry(currentCountryCode: string): any { // return a string for each name searched

    for (let i = 0; i < 256; i++) {
      if (currentCountryCode == cities_name[i].sigla) {
        return cities_name[i].country_name;
      }
    }

  }

  getCurrentBadge(currentBadge: string) {
    const badgeApiURL: string = `https://flagsapi.com/${currentBadge}/flat/64.png`;

    return badgeApiURL;
  }
}

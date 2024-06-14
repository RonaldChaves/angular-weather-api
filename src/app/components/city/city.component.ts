import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeComponent } from '../../pages/home/home.component';

// Data
import { CityData } from '../../models/cityData';

//Services
import { WeatherService } from '../../services/weather.service';
import { SearchCityService } from '../../services/search-city.service';

// json with all countries name
import cities_name from "../../../assets/data/cities_name.json";
import capital_utc from "../../../assets/data/capital_utc.json";


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.css',
  providers: [HomeComponent]
})
export class CityComponent implements OnInit, OnDestroy {

  countryBadge: any;
  capitalName: string = '';
  timeUTCCapital: string = '';
  intervalId: any;

  city: CityData = {
    name: '',
    country: '',
    countryCode: '',
    countryBadge: ''
  };

  constructor(
    private service: WeatherService,
    private search: SearchCityService
  ) { }

  ngOnInit(): void {
    // Inscreva-se no Observable para ouvir mudanças no cityName
    this.search.currentCityName.subscribe((cityName: string) => {
      if (cityName) {
        this.getCity(cityName, this.search.currentLanguage.subscribe(lang => {
          if (lang) this.getLang(lang);
        }));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  //Method for return a current language
  getLang(cL: string) {
    return cL;
  }

  getCity(citySearch: string, currentLanguage: any) {
    this.service.getWeatherData(citySearch, currentLanguage).subscribe({
      next: (res) => {
        if (res) {
          // For verification of this variables
          const countryCode = res.sys.country;
          const countryBadge = this.getCurrentBadge(countryCode);
          const country = this.getCompleteNameCountry(countryCode);

          this.capitalName = this.getCapitalName(countryCode);
          this.getUTCCapitalTime(countryCode);

          this.city = {
            name: res.name,
            countryCode: countryCode,
            countryBadge: countryBadge,
            country: country,
          };
        }
      }
    });
  }


  // this change a country code (example: BR) to a complete name of current country 
  //(return 'Brasil' or 'Brazil') but it's only in portuguese.

  // 

  getCompleteNameCountry(currentCountryCode: string): any {
    const country = cities_name.find((item: any) => item.sigla === currentCountryCode);
    return country ? country.country_name : 'Unknown';
  }

  getCurrentBadge(currentBadge: string): any {
    if (currentBadge) {
      const badgeApiURL: string = `https://flagsapi.com/${currentBadge}/flat/64.png`;
      return badgeApiURL;
    }
    return '';
  }

  getUTCCapitalTime(currentCountryCode: string): any {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    const currentUTCTime = capital_utc.find(item => item.country_code === currentCountryCode);
    if (currentUTCTime) {
      this.intervalId = setInterval(() => {
        const date = new Date();
        let hoursUTC = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        let seconds = date.getUTCSeconds();

        let hours = hoursUTC + currentUTCTime.timezone;
        if (hours >= 24) {
          hours -= 24;
        } else if (hours < 0) {
          hours += 24;
        }

        const formattedDate = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
        this.timeUTCCapital = formattedDate;
      }, 1000);
    }
  }

  getCapitalName(currentCountryCode: string): any {
    if (currentCountryCode) {
      const currentCapitalName = capital_utc.find((item: any) => item.country_code === currentCountryCode);
      return currentCapitalName ? currentCapitalName.capital : 'unknow';
    }
  }
}


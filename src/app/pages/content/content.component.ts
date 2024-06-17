import { Component, OnInit } from '@angular/core';
import { SearchCityService } from '../../services/search-city.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit {

  notFound: boolean = true;
  welcome: boolean = false;

  constructor(
    private search: SearchCityService,
    private service: WeatherService
  ) { }


  ngOnInit(): void {


    this.search.currentCityName.subscribe(cityName => {
      if (cityName) this.verifyCityFound(cityName,
        this.search.currentLanguage.subscribe(lang => {
          if (lang) this.returnCL(lang);
        }))
    })
  }

  // Method for return a current language
  returnCL(cl: any) {
    return cl;
  }

  verifyCityFound(cityName: string, currentLang: string | any) {
    this.service.getWeatherData(cityName, currentLang).subscribe({
      next: (res) => {
        if (res) {
          this.welcome = false
          this.notFound = true
        }
      },
      error: () => {
        this.notFound = false
      }
    });
  }

}

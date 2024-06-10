import { Component, OnInit } from '@angular/core';
import { DetailsData } from '../../models/deatilsData';
import { WeatherService } from '../../services/weather.service';
import { error } from 'console';
import { SearchCityService } from '../../services/search-city.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  humidity: any;
  cloudPercent: any;
  visibility: any;
  sunrise: any;
  sunset: any;

  details: DetailsData = {
    visibility: 0,
    clouds: {
      all: 0
    },
    main: {
      humidity: 0
    },
    sys: {
      sunrise: 0,
      sunset: 0
    }
  }

  constructor(
    private service: WeatherService,
    private search: SearchCityService) { }

  ngOnInit(): void {
    this.getDetails('itaoca');

    this.search.currentCityName.subscribe(cityname =>{
      if(cityname) this.getDetails(cityname);
    })
  }

  getDetails(cityName: string) {
    var d: any = this.details;

    this.service.getWeatherData(cityName).subscribe({
      next: (res) => {
        d.main.humidity = res.main.humidity,
          d.clouds.all = res.clouds.all,
          d.sys.sunrise = res.sys.sunrise,
          d.sys.sunset = res.sys.sunset,
          d.visibility = res.visibility
      },
      error: (err) => {console.log(alert('Not Found'))}
    });
  }
}

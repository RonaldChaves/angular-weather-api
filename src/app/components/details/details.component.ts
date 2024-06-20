import { Component, OnInit } from '@angular/core';

import { DetailsData } from '../../models/deatilsData';
import { WeatherService } from '../../services/weather.service';
import { SearchCityService } from '../../services/search-city.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

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

    this.search.currentCityName.subscribe(cityname => {
      if (cityname) this.getDetails(cityname);
    })
  }

  getDetails(cityName: string) {
    var d: any = this.details;

    this.service.getWeatherData(cityName, 'pt_br').subscribe({
      next: (res) => {
        d.main.humidity = res.main.humidity,
          d.clouds.all = res.clouds.all,
          d.sys.sunrise = this.getUnixTime(res.sys.sunrise),
          d.sys.sunset = this.getUnixTime(res.sys.sunset),
          d.visibility = res.visibility / 100 // for use percent (%)
      }
    });
  }

  getUnixTime(time: number) {
    var date: Date = new Date(time * 1000);

    var hours: number = date.getHours();
    var minutes: number | string = '' + date.getMinutes();
    var seconds: number | string = '' + date.getSeconds();

    var formattedTime: number | string = hours + ':' + minutes.substring(-2) + ':' + seconds.substring(-2) + 'h';

    return formattedTime;
  }

  clickInfo() {
    const info = document.querySelector('.info');
    info?.classList.remove('hide');

    setTimeout(() => {
      info?.classList.add('hide');
    }, 3500)

  }
}

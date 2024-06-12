import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { SearchCityService } from '../../services/search-city.service';
import { PressureData } from '../../models/pressureData';

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrl: './pressure.component.css'
})
export class PressureComponent implements OnInit {

  inWork: boolean = true;

  pressure: PressureData = {
    main: {
      sea_level: 0,
      grnd_level: 0
    }
  }

  constructor(
    private service: WeatherService,
    private search: SearchCityService) { }

  ngOnInit(): void {
    this.getPressure('itaoca');

    this.search.currentCityName.subscribe(cityName => {
      if (cityName) this.getPressure(cityName)
    });
  }

  getPressure(cityName: string) {
    this.service.getWeatherData(cityName, 'pt_br').subscribe({
      next: (res) => {
        if (res.main.sea_level &&
          res.main.grnd_level) {
          this.pressure.main.sea_level = res.main.sea_level,
            this.pressure.main.grnd_level = res.main.grnd_level
        }
        else {
          this.inWork = false;
        }

      },
      error: (err) => alert('Not found')
    });
  }
}

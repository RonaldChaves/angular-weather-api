import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { SearchCityService } from '../../services/search-city.service';
import { PressureData } from '../../models/pressureData';

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrl: './pressure.component.css'
})
export class PressureComponent implements OnInit{

  pressure: PressureData = {
    main: {
      sea_level: 0,
      grnd_level: 0
    }
  }

  constructor(
    private service: WeatherService,
    private search: SearchCityService){}

  ngOnInit(): void {
    this.getPressure('itaoca');

    this.search.currentCityName.subscribe(cityName => {
      if(cityName) this.getPressure(cityName)
    });
  }

  getPressure(cityName: string){
    this.service.getWeatherData(cityName).subscribe({
      next: (res) =>{
        this.pressure.main.sea_level = res.main.sea_level,
        this.pressure.main.grnd_level = res.main.grnd_level
      },
      error: (err) => alert('Not found')
    });
  }
}

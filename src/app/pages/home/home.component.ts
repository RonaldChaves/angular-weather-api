import { Component } from '@angular/core';
import { SearchCityService } from '../../services/search-city.service';
import { CityComponent } from '../../components/city/city.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  // constructor(private search: SearchCityService) { }


  // getCitySearched() {
  //   const input: any = document.querySelector('.search-input');
  //   return input.value;
  // }


  cityName: string = '';

  constructor(private search: SearchCityService) { }

  getCitySearched() {
    const input: HTMLInputElement | null = document.querySelector('.search-input');
    if (input) {
      this.cityName = input.value;
      this.search.changeCityName(this.cityName);  // Atualiza o serviço com o nome da cidade
    }
  }
}

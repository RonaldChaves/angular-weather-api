import { Component, OnInit } from '@angular/core';
import { SearchCityService } from '../../services/search-city.service';

import lang_list from '../../../assets/data/lang.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  multlang: any[] = [];
  multCountry: any[] = [];
  countryCompleteName: any;

  cityName: string = '';
  language: string = '';
  badgeURL: string = '';

  constructor(private search: SearchCityService) { }

  ngOnInit(): void {
    this.returnSiglas();
    this.returnCompleteCountry();
  }

  getCitySearched() {
    const input: HTMLInputElement | null | any = document.querySelector('.search-input');
    if (input) {
      this.cityName = input.value;
      this.search.changeCityName(this.cityName);  // Atualiza o serviço com o nome da cidade
    }
    input.value = '';
  }

  getLanguageSearched() {
    const langChoosed: HTMLSelectElement | any = document.querySelector('.lang-change');

    if (langChoosed) {
      this.language = langChoosed.value;
      this.search.changeLanguage(this.language);

      // Atualiza o nome completo do país quando a linguagem é pesquisada
      this.updateCountryName(langChoosed.value);

    }
  }

  returnSiglas() {
    this.multlang = lang_list.map(lang => ({ code: lang.code, country: lang.country }));
  }

  returnCompleteCountry() {
    this.multCountry = lang_list;
  }

  updateCountryName(event: any) {
    const selectedLangCode = event.target ? event.target.value : event;
    const selectedLang = this.multCountry.find(lang => lang.code === selectedLangCode);
    if (selectedLang) {
      this.countryCompleteName = selectedLang.country;
    }
  }

}

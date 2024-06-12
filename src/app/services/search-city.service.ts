import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchCityService {

  constructor() { }

  private cityNameSource = new BehaviorSubject<string>(''); // default value
  currentCityName = this.cityNameSource.asObservable();


  changeCityName(cityName: string) {
    this.cityNameSource.next(cityName);

    return this.cityNameSource.next(cityName);
  }

  private languageSource = new BehaviorSubject<string>('');
  currentLangauge = this.languageSource.asObservable();

  changeLanguage(language: any) {
    this.languageSource.next(language);

    return  this.languageSource.next(language);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityComponent } from './city/city.component';
import { DetailsComponent } from './details/details.component';
import { PressureComponent } from './pressure/pressure.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { WindComponent } from './wind/wind.component';
import { HttpClient } from '@angular/common/http';
import { NotFound404Component } from './not-found-404/not-found-404.component';
import { WelcomeComponent } from './welcome/welcome.component';



@NgModule({
  declarations: [
    CityComponent,
    TemperatureComponent,
    DetailsComponent,
    WindComponent,
    PressureComponent,
    NotFound404Component,
    WelcomeComponent,
  ],
  exports: [
    CityComponent,
    TemperatureComponent,
    DetailsComponent,
    WindComponent,
    PressureComponent,
    NotFound404Component,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [HttpClient]
})
export class ComponentsModule { }

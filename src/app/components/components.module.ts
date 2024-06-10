import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityComponent } from './city/city.component';
import { DetailsComponent } from './details/details.component';
import { PressureComponent } from './pressure/pressure.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { WindComponent } from './wind/wind.component';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    CityComponent,
    TemperatureComponent,
    DetailsComponent,
    WindComponent,
    PressureComponent,
  ],
  exports: [
    CityComponent,
    TemperatureComponent,
    DetailsComponent,
    WindComponent,
    PressureComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [HttpClient]
})
export class ComponentsModule { }

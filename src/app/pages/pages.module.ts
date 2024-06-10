import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from "../components/components.module";



@NgModule({
    declarations: [
        HomeComponent,
        ContentComponent,
    ],
    exports: [
        HomeComponent,
        ContentComponent,
    ],
    imports: [
        CommonModule,
        ComponentsModule
    ]
})
export class PagesModule { }

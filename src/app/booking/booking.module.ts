import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import {MatStepperModule} from "@angular/material/stepper";


@NgModule({
  declarations: [
    BookingComponent
  ],
    imports: [
        CommonModule,
        BookingRoutingModule,
        MatStepperModule
    ]
})
export class BookingModule { }

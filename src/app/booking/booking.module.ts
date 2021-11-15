import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    BookingComponent
  ],
    imports: [
        CommonModule,
        BookingRoutingModule,
        MatStepperModule,
        MatCardModule,
        MatInputModule,
        MatDatepickerModule
    ]
})
export class BookingModule { }

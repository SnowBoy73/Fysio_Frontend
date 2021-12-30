import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxsModule} from '@ngxs/store';
import {BookingState} from './state/booking.state';
import {environment} from '../../environments/environment';


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
        MatDatepickerModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([BookingState])
    ]
})
export class BookingModule { }

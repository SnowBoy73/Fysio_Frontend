import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreatmentsRoutingModule } from './treatments-routing.module';
import { TreatmentsComponent } from './treatments.component';


@NgModule({
  declarations: [
    TreatmentsComponent
  ],
  imports: [
    CommonModule,
    TreatmentsRoutingModule
  ]
})
export class TreatmentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EliteSportRoutingModule } from './elite-sport-routing.module';
import { EliteSportComponent } from './elite-sport.component';


@NgModule({
  declarations: [
    EliteSportComponent
  ],
  imports: [
    CommonModule,
    EliteSportRoutingModule
  ]
})
export class EliteSportModule { }

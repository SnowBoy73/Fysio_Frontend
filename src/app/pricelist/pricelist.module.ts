import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricelistRoutingModule } from './pricelist-routing.module';
import { PricelistComponent } from './pricelist.component';


@NgModule({
  declarations: [
    PricelistComponent
  ],
  imports: [
    CommonModule,
    PricelistRoutingModule
  ]
})
export class PricelistModule { }

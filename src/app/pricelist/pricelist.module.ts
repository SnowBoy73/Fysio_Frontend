import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricelistRoutingModule } from './pricelist-routing.module';
import { PricelistComponent } from './pricelist.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    PricelistComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    PricelistRoutingModule

  ]
})
export class PricelistModule { }

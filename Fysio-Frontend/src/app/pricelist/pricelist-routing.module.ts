import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricelistComponent } from './pricelist.component';

const routes: Routes = [{ path: '', component: PricelistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricelistRoutingModule { }

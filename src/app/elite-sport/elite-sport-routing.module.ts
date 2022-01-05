import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EliteSportComponent } from './elite-sport.component';

const routes: Routes = [{ path: '', component: EliteSportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EliteSportRoutingModule { }

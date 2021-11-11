import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'bookings', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule) },
  { path: 'pricelists', loadChildren: () => import('./pricelist/pricelist.module').then(m => m.PricelistModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'contactinfo', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

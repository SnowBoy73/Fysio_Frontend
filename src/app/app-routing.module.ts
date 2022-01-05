import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'bookings', loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule) },
  { path: 'pricelists', loadChildren: () => import('./pricelist/pricelist.module').then(m => m.PricelistModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'contactinfo', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'behandlinger', loadChildren: () => import('./treatments/treatments.module').then(m => m.TreatmentsModule) },
  { path: 'eliteIdræt', loadChildren: () => import('./elite-sport/elite-sport.module').then(m => m.EliteSportModule) },
  { path: 'produkter', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

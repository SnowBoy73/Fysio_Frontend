import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatStepperModule} from '@angular/material/stepper';
import {NgxsModule} from '@ngxs/store';
import { CdkStepperModule } from '@angular/cdk/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";


//import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';

//const config: SocketIoConfig = { url: 'http://localhost:3004', options: {} };
const config: SocketIoConfig = { url: environment.backendUrl, options: {} };



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    //NgxsLoggerPluginModule.forRoot(),*/
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    CdkStepperModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSidenavModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BookingComponent} from './booking/booking.component'
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
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCommonModule} from '@angular/material/core';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClientModule} from '@angular/common/http';
import {BookingState} from './booking/state/booking.state';
//import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';

//const config: SocketIoConfig = { url: 'http://localhost:3004', options: {} };
const config: SocketIoConfig = { url: environment.backendUrl, options: {} };


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    SocketIoModule.forRoot(config),
    NgxsModule.forRoot([], {  // need BookingState??
      developmentMode: !environment.production
    }),
    //NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    CdkStepperModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatCommonModule,
    MatSidenavModule,
    MatDatepickerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

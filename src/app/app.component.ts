import { Component } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {BookingService} from './booking/shared/booking.service';
import {SharedService} from './shared/shared.service';
import { ServicesDto } from './shared/services.dto';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Fysio-Frontend';

  socketId: string | undefined;
  unsubscribe$ = new Subject();
  allServices: any[] = [];  // ServicesDto

  constructor(private sharedService: SharedService) {
  }


  ngOnInit(): void {
    console.log('App Component Initialised');
    this.sharedService.connect(); // MUY IMPORTANTÉ!!  // PROBLEM with 2 connections???

    this.sharedService.listenForAllServices()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(services => {
        console.log('services received');
        this.allServices = services;
        console.log('this.allServices = ' + this.allServices);
      });
  }

}

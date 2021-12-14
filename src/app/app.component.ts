import { Component } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {BookingService} from './booking/shared/booking.service';
import {SharedService} from './shared/shared.service';
import { ServicesModel } from './shared/services.model';
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
  allServices: any[] = [];  // ServicesModel

  constructor(private sharedService: SharedService) {
  }


  ngOnInit(): void {
    console.log('App Component Initialised');
    this.sharedService.getAllServices().then( (data) => {
      console.log(data);
      this.allServices = data;
      console.log('App Component this.allServices = ' + this.allServices);
    });

 }


    /*this.sharedService.connect(); // MUY IMPORTANTÉ!!  // PROBLEM with 2 connections???
    this.sharedService.getAllService()
    this.sharedService.listenForAllServices()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(services => {
        console.log('services received');
        this.allServices = services;
        console.log('this.allServices = ' + this.allServices);
      });*/


}

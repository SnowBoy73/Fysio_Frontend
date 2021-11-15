import { Component, OnInit } from '@angular/core';
import {BookingService} from './shared/booking.service';
import {BookingModel} from './shared/booking.model';
import {BookingDto} from './shared/booking.dto';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {dateEnquiryDto} from './shared/date-enquiry.dto';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  socketId: string | undefined;
  unsubscribe$ = new Subject();
  availableTimesFromDB: string[] = [];
  constructor(
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    console.log('Booking Component Initialised');
    this.bookingService.connect(); // MUY IMPORTANTÉ!!


//
    this.bookingService.listenForAvailableTimes()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(availableTimes => {
        console.log('availableTimes received');
        this.availableTimesFromDB = availableTimes;
        console.log('this.availableTimesFromDB = ' + this.availableTimesFromDB);
      });


//
    this.bookingService.listenForNewBooking()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(booking => {
        console.log('booking received');
      });



    this.bookingService.listenForConnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        console.log('connect id', id); //
        this.socketId = id;
      });
    this.bookingService.listenForDisconnect()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((id) => {
        console.log('disconnect id', id); //
        this.socketId = id;
      });

  }

  ngOnDestroy(): void {
    console.log('Booking Component Destroyed');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.bookingService.disconnect();  // Removed to stay connected between routes
    //this.store.dispatch(new StopListeningForClients());
  }


  postBooking() {
    const bookingPeriods: BookingDto[] = [];
    // need to create multiple bookings for 1 hour + bookings
    const mockBooking: BookingDto = {
      date: "Thu Nov 18 2021 00:00:00 GMT+0100 (Central European Standard Time",
      time: "13:30",
      service: "circumcision3",
      email: "real@email.com",
      phone: 12345678,
      address: "11 Blah St",
      city: "Cooltown",
      postcode: 11223344,
      notes: "Do I get a happy ending?",
    }
    console.log(' MockBooking = ' + mockBooking.date + ' : time = ' + mockBooking.time);

    bookingPeriods.push(mockBooking);  // mock
    console.log(' bookingPeriods length = ' + bookingPeriods.length);
    this.bookingService.postBooking(bookingPeriods);

  }

  postSelectedDate() {
    let dateEnquiry: dateEnquiryDto = {
      date: 'Thu Nov 18 2021 11:00:00 GMT+0100 (Central European Standard Time',
      duration: 60
    }
    this.bookingService.postSelectedDate(dateEnquiry);
  }
}

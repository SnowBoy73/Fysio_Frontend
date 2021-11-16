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
  availableTimesOnDateSelected: string[] = [];
  bookingSlotDuration: number = 30;  // minutes in a booking slot - get from admin table in DB later

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
        this.availableTimesOnDateSelected = availableTimes;
        console.log('this.availableTimesFromDB = ' + this.availableTimesOnDateSelected);
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


  postBooking() { // date: string, duration: number, ) {
    const bookingPeriods: BookingDto[] = [];

    // New for 16 Nov 2021
    const bookingDuration = 60;  // MOCK minutes. Get from selecting treatment
    const bookingSlotsNeeded: number = bookingDuration / this.bookingSlotDuration;  // Number of booking slots needed for booking
    console.log(' bookingSlotsNeeded = ' + bookingSlotsNeeded);
    for (let i = 0; i < bookingSlotsNeeded; i++) {
      const newBooking: BookingDto = {
        date: "Thu Nov 18 2021 00:00:00 GMT+0100 (Central European Standard Time", // Get from datepicker
        time: "13:30",  // Get from time selected in stepper
        service: "circumcision3",   // Get from stepper
        email: "real@email.com",  // null to start with. Replaced after info is entered
        phone: 12345678, // null to start with. Replaced after info is entered
        address: "11 Blah St", // null to start with. Replaced after info is entered
        city: "Cooltown", // null to start with. Replaced after info is entered
        postcode: 11223344, // null to start with. Replaced after info is entered
        notes: "Do I get a happy ending?", // null to start with. Replaced after info is entered
      }
    }

    // need to create multiple bookings for 1 hour + bookings
  /*  const mockBooking: BookingDto = {
      date: "Thu Nov 18 2021 00:00:00 GMT+0100 (Central European Standard Time",
      time: "13:30",
      service: "bondage",
      email: "ock@email.com",
      phone: 99887766,
      address: "666 Devil Lane",
      city: "Cooltown",
      postcode: 4321,
      notes: "I need a pretty girl",
    }
    console.log(' MockBooking = ' + mockBooking.date + ' : time = ' + mockBooking.time);

    bookingPeriods.push(mockBooking);  // mock
   
   */
    console.log(' bookingPeriods length = ' + bookingPeriods.length);
    // this.bookingService.postBooking(bookingPeriods);
  }

  postSelectedDate() {
    let dateEnquiry: dateEnquiryDto = {
      date: 'Thu Nov 18 2021 11:00:00 GMT+0100 (Central European Standard Time)',
      duration: 60
    }
    this.bookingService.postSelectedDate(dateEnquiry);
  }
}

import { Component, OnInit } from '@angular/core';
import {BookingService} from './shared/booking.service';
import {BookingModel} from './shared/booking.model';
import {BookingDTO} from './shared/booking.dto';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  socketId: string | undefined;
  unsubscribe$ = new Subject();

  constructor(
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    console.log('Booking Component Initialised');
    this.bookingService.connect(); // MUY IMPORTANTÉ!!

    //
    this.bookingService.listenForNewBooking()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(booking => {
        console.log('booking received');
  /*      if (-- booking falls on day(s) being viewed --) {
          console.log( 'New booking = ', booking);

          if (-- get correct date if needed--) {
            console.log( 'booking added to {that date}');
// Push booking on bookingsDate array (of bookings)
        //    this.bookingDate.push(booking);
          }
        }
*/
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
    const bookingPeriods: BookingDTO[] = [];
    // need to create multiple bookings for 1 hour + bookings
    const mockBooking: BookingDTO = {
      date: "2021-11-02",
      time: "9:00",
      service: "circumcision3",
      email: "real@email.com",
      phone: 12345678,
      address: "11 Blah St",
      city: "Cooltown",
      postcode: 11223344,
      notes: "Do I get a happy ending?",
    }
    bookingPeriods.push(mockBooking);  // mock
    this.bookingService.postBooking(bookingPeriods);
  }

}

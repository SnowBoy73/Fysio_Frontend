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

  constructor(
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    console.log('Booking Component Initialised');
    this.bookingService.connect(); // MUY IMPORTANTÉ!!

  }

  postBooking() {

    const mockBooking: BookingDTO = {
      date: "2021-11-02",
      time: "11.00",
      service: "circumcision2",
      email: "real@email.com",
      phone: 12345678,
    }
    this.bookingService.postBooking(mockBooking);
  }

  postBookingTEST() {
    const mockBooking: BookingDTO = {
      date: "2021-11-02",
      time: "11.00",
      service: "fluff",
      email: "test@email.com",
      phone: 12345678,
    }
    //this.bookingService.postBookingTEST(mockBooking);
    this.bookingService.postBookingTEST(mockBooking);

  }
}

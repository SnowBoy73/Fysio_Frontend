import { Injectable } from '@angular/core';
import {Socket, SocketIoConfig} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {BookingModel} from './booking.model';
import {map} from 'rxjs/operators';
import {BookingDto} from './booking.dto';
import {dateEnquiryDto} from './date-enquiry.dto';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private socket: Socket) { }

  postBooking(bookingPeriod: BookingDto): void {
    console.log('postBooking ', bookingPeriod.email);
    this.socket.emit('postBooking', bookingPeriod);
  }



  postSelectedDate(selectedDate: dateEnquiryDto) {
    console.log('date emitted is = ' + selectedDate.date);
    console.log('booking duration is = ' + selectedDate.duration);

    this.socket.emit('postSelectedDate', selectedDate);

  }


  listenForAvailableTimes() {
    return this.socket
      .fromEvent<string[]>('availableTimes');
  }

  listenForNewBooking(): Observable<BookingModel[]> {
    return this.socket
      .fromEvent<BookingModel[]>('newBooking');
  }

/*
  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('error');
  }
 */

  listenForConnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('connect')
      .pipe(
        map(() => {
          return this.socket.ioSocket.id;
        })
      );
  }

  listenForDisconnect(): Observable<string> {
    return this.socket
      .fromEvent<string>('disconnect')
      .pipe(
        map(() => {
          return this.socket.ioSocket.id;
        })
      );
  }


  disconnect(): void{   // Disconnects the socket to the Backend
    console.log('service Disconnect called');
    this.socket.disconnect();
  }

  connect(): void{  // Connects the socket to the Backend
    console.log('service Connect called');
    this.socket.connect();
  }


}

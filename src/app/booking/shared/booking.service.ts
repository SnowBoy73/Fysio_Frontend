import { Injectable } from '@angular/core';
import {Socket, SocketIoConfig} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {BookingModel} from './booking.model';
import {map} from 'rxjs/operators';
import {BookingDTO} from './booking.dto';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private socket: Socket) { }

  postBooking(bookingDto: BookingDTO): void {
    console.log('postBooking ', bookingDto.email);
    this.socket.emit('postBooking', bookingDto);
  }

  listenForNewBooking(): Observable<BookingModel> {
    return this.socket
      .fromEvent<BookingModel>('newBooking');
  }
/*
  requestSchedule(selectedDate: string): void {
    console.log('requestSchedule called');
    this.socket.emit('requestSchedule', selectedDate); // date, maybe date object
  }

  listenForSchedule(): Observable<BookingDTO[]> {  // dateDTO??
    return this.socket
      .fromEvent<BookingModel[]>('schedule');
  }


  listenForErrors(): Observable<string> {
    return this.socket
      .fromEvent<string>('error');
  }


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
  */

  disconnect(): void{
    console.log('service Disconnect called');
    this.socket.disconnect();
  }

  connect(): void{
    console.log('service Connect called');
    this.socket.connect();
  }

}

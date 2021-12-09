import { Injectable } from '@angular/core';
import {Socket, SocketIoConfig} from 'ngx-socket-io';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ServicesDto} from './services.dto';

@Injectable({
  providedIn: 'root'
})

export class SharedService {


  constructor(private socket: Socket) { }


 getAllService(allServices: ServicesDto[]): void {
    this.socket.emit('getAllServices');
  }




  listenForAllServices() {
    return this.socket
      .fromEvent<string[]>('allServices');
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

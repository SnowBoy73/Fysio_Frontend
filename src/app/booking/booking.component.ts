import {Component, OnInit, ViewChild} from '@angular/core';
import {BookingService} from './shared/booking.service';
import {BookingModel} from './shared/booking.model';
import {BookingDto} from './shared/booking.dto';
import {Observable, Subject, Subscription} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import { MatStepper } from '@angular/material/stepper';
import {FormGroup} from "@angular/forms";


import {dateEnquiryDto} from './shared/date-enquiry.dto';
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {
  socketId: string | undefined;
  unsubscribe$ = new Subject();
  selectetTreatment = '';
  selectetDuration = 1;
  selectedTime = '';

  stepOne = false;
  stepTwo= false;
  stepThree= false;

  selected: any;
  selectedDate: any;
  //selectedTime: any;



  Email = new FormControl('');
  phone = new FormControl('');
  address = new FormControl('');
  city = new FormControl('');
  postcode = new FormControl('');
  notes = new FormControl('');

  availableTimesOnDateSelected: string[] = [];
  bookingSlotDuration: number = 30;  // minutes in a booking slot - get from admin table in DB later


  constructor(private bookingService: BookingService) {}


  ngOnInit(): void {
    console.log('Booking Component Initialised');
    this.bookingService.connect(); // MUY IMPORTANTÉ!!



    this.bookingService.listenForAvailableTimes()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(availableTimes => {
        console.log('availableTimes received');
        this.availableTimesOnDateSelected = availableTimes;
        console.log('this.availableTimesFromDB = ' + this.availableTimesOnDateSelected);
      });


    this.bookingService.listenForNewBooking()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(newBooking => {
        console.log('newBooking received: = ' + newBooking.toString());
        for (let i = 0; i < newBooking.length; i++) {
          console.log('newBooking part : ' + i);
          console.log('newBooking date: ' + newBooking[i].date);
          console.log('newBooking time: ' + newBooking[i].time);
          console.log('newBooking service: ' + newBooking[i].service);
          console.log('newBooking email: ' + newBooking[i].email);
          console.log('newBooking phone: ' + newBooking[i].phone);
          console.log('newBooking address: ' + newBooking[i].address);
          console.log('newBooking city: ' + newBooking[i].city);
          console.log('newBooking postcode: ' + newBooking[i].postcode);
          console.log('newBooking notes: ' + newBooking[i].notes);
          console.log('newBooking duration: ' + (newBooking.length * this.bookingSlotDuration));
        }
      });


    this.bookingService.listenForDeletedBooking()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(deletedBooking => {
        console.log('deletedBooking received: = ' + deletedBooking.toString());
        for (let i = 0; i < deletedBooking.length; i++) {
          console.log('deletedBooking part : ' + i);
          console.log('deletedBooking date: ' + deletedBooking[i].date);
          console.log('deletedBooking time: ' + deletedBooking[i].time);
          console.log('deletedBooking service: ' + deletedBooking[i].service);
          console.log('deletedBooking email: ' + deletedBooking[i].email);
          console.log('deletedBooking phone: ' + deletedBooking[i].phone);
          console.log('deletedBooking address: ' + deletedBooking[i].address);
          console.log('deletedBooking city: ' + deletedBooking[i].city);
          console.log('deletedBooking postcode: ' + deletedBooking[i].postcode);
          console.log('deletedBooking notes: ' + deletedBooking[i].notes);
          console.log('deletedBooking duration: ' + (deletedBooking[i].duration));
        }
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
    const bookingPeriod: BookingDto= {
      date: this.selected, //"Thu Nov 18 2021 00:00:00 GMT+0100 (Central European Standard Time", // Get from datepicker
      time: this.selectedTime,  // Get from time selected in stepper
      service: this.selectetTreatment,   // Get from stepper
      email: this.Email.value,  // null to start with. Replaced after info is entered
      phone: this.phone.value, // null to start with. Replaced after info is entered
      address: this.address.value, // null to start with. Replaced after info is entered
      city: this.city.value, // null to start with. Replaced after info is entered
      postcode: this.postcode.value, // null to start with. Replaced after info is entered
      notes: this.notes.value, // null to start with. Replaced after info is entered
      duration: this.selectetDuration
    }
   console.log(this.Email.value, this.phone.value,this.address.value,this.city.value,this.postcode.value,this.notes.value);
     this.bookingService.postBooking(bookingPeriod);
     return bookingPeriod
  }


  selectedTreatment(String: string) {
    this.selectetTreatment = String;
    if(this.selectetTreatment != null){
      this.stepOne = true;
    }
    return String;
  }


  selectedDuration(Time: number) {
  this.selectetDuration = Time;
    if(this.selectetDuration != null) {
      this.stepTwo = true;
    }
    return Time;
  }


  bookTime(item: string) {
    if (this.selected != null) {
      this.selectedTime = item;
      this.stepThree = true;
    }
    return item;
  }


  postSelectedDate($event: any) {
    this.selected = new Date($event).toString();
    let dateEnquiry: dateEnquiryDto = {
      date: this.selected,
      duration: this.selectetDuration
    }
    this.bookingService.postSelectedDate(dateEnquiry);
    return $event;
  }


  deleteBooking() {
    const mockDelete: BookingDto = {
      date: "Thu Nov 18 2021 00:00:00 GMT+0100 (Central European Standard Time", // Get from datepicker
      time: "10:00",  // Get from time selected in stepper
      service: "Spanking",   // Get from stepper
      email: "a",  // null to start with. Replaced after info is entered
      phone: 1, // null to start with. Replaced after info is entered
      address: "this.address.value", // null to start with. Replaced after info is entered
      city: "this.city.value", // null to start with. Replaced after info is entered
      postcode: 1234, // null to start with. Replaced after info is entered
      notes: "this.notes.value", // null to start with. Replaced after info is entered
      duration: 30,
    }
    this.bookingService.deleteBooking(mockDelete);
  }


}

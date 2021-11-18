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
  selectetDuration = -1;

  stepOne = false;
  stepTwo= false;
  stepThree= true;

  selected: any;
  selectedDate: any;
  selectedTime: any;



  Email = new FormControl('');
  phone = new FormControl('');
  address = new FormControl('');
  city = new FormControl('');
  postcode = new FormControl('');
  notes = new FormControl('');


  availableTimesOnDateSelected: string[] = [];
  bookingSlotDuration: number = 30;  // minutes in a booking slot - get from admin table in DB later



  constructor(
    private bookingService: BookingService

  ) {}

  ngOnInit(): void {
    console.log('Booking Component Initialised');
    this.bookingService.connect(); // MUY IMPORTANTÉ!!
    this.selectedTime = '9:30'


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
  }


  selectedTreatment(String: string) {
    this.selectetTreatment = String;
    if(this.selectetTreatment != null){
      this.stepOne = true;
    }

  }
  selectedDuration(Time: number) {
  this.selectetDuration = Time;
    if(this.selectetDuration != null){
      this.stepTwo = true;
  }


  }

  bookTime(item: any) {
    if (this.selected != null) {
      this.selectedTime = item;
      this.stepThree = true;
    }
  }


  postSelectedDate($event: any) {
    this.selected = $event;  //  NEEDED???
    const date_ob = new Date($event).toString();
    let dateEnquiry: dateEnquiryDto = {
      date: date_ob,
      duration: this.selectetDuration
    }
    this.bookingService.postSelectedDate(dateEnquiry);
  }


}

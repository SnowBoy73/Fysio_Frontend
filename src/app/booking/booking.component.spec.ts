import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingComponent } from './booking.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {environment} from "../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  const config: SocketIoConfig = { url: environment.backendUrl, options: {} };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingComponent ],
      imports:[
        SocketIoModule.forRoot(config),
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectetTreatment ', ()=>{
    expect(component.selectedTreatment('Massage')).toBe(component.selectetTreatment);
  })
  // supose to fail
  it('selectetTreatment fail ', ()=>{
    expect(component.selectedTreatment('Massage')).not.toBe('Traning optimering');
  })

  it('selectedDuration ', ()=>{
    expect(component.selectedDuration(60)).toBe(component.selectetDuration);
  })

  // supose to fail
  it('selectedDuration fail ', ()=>{
    expect(component.selectedDuration(60)).not.toBe(50);
  })
  //look why fail ?

  it('bookTime ', ()=>{
    expect(component.bookTime('10.30')).toBe(component.selectedTime);
  })

  it('bookTime fail ', ()=>{
    expect(component.bookTime('60')).not.toBe('50');
  })




});

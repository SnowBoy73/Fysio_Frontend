import { Component } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {BookingService} from './booking/shared/booking.service';
import {SharedService} from './shared/shared.service';
import { ServicesModel } from './shared/services.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Fysio-Frontend';



  allServices: ServicesModel[] = [];  // ServicesModel
  selectedService: any



  constructor(private sharedService: SharedService, private router: Router) {
   this.allServices = [
     {id: '1', name: 'Helbredsorienteret fysiotarpi', duration: '30', hourlyRate: 500, info1: 'info1', info2: 'info2', info3: 'info3'},
     {id: '1', name: 'Akupunktur', duration: '30', hourlyRate: 500, info1: 'info1', info2: 'info2', info3: 'info3'},
     {id: '1', name: 'Fysioterpeutisk massage', duration: '30', hourlyRate: 500, info1: 'info1', info2: 'info2', info3: 'info3'},
     {id: '1', name: 'Tilrettelæggelse af træningsprogram', duration: '30', hourlyRate: 500, info1: 'info1', info2: 'info2', info3: 'info3'},
     {id: '1', name: 'Sport og performance optimering', duration: '30', hourlyRate: 500, info1: 'info1', info2: 'info2', info3: 'info3'}
   ]
  }


  ngOnInit(): void {
    console.log('App Component Initialised');
    // this.sharedService.getAllServices().then( (data) => {
    //   console.log(data);
    //   this.allServices = data;
    //   console.log('App Component this.allServices = ' + this.allServices);
    // });

 }



  selectedTreatment(treatment: string) {

    for (let i = 0; i < this.allServices.length; i++) {
      console.log(this.allServices)
      if(this.allServices[i].name == treatment){
        this.selectedService = this.allServices[i];
        console.log(this.allServices[i])
      }
    }


    this.router.navigate(['/home']).then(() => {this.router.navigate(['/behandlinger'], {state: {data: this.selectedService}})});


  }


}

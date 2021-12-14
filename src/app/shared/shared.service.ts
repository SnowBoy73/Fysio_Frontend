import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ServicesModel} from './services.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SharedService {


  constructor(private http: HttpClient) {}


 async getAllServices(): Promise<any[]> {
   console.log('getAllService called');
     const allServices = await this.http.get<any[]>(environment.backendUrl + '/services/allServices').toPromise();
     return allServices.map(a => {
       //console.log(a);
       const id = a.id;
       const name = a.name;
       const duration = a.duration;
       const hourlyRate = a.hourlyRate;
       const info1 = a.info1;
       const info2 = a.info2;
       const info3 = a.info3;
       return {id, name, duration, hourlyRate, info1, info2, info3 } as ServicesModel;
     });
   }



}

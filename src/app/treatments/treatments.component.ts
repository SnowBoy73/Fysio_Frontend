import { Component, OnInit } from '@angular/core';
import {ServicesModel} from "../shared/services.model";


@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent implements OnInit {


  selectedTreatment:  ServicesModel;

  constructor() {
this.selectedTreatment = {id: '0', name: '0', duration: '0', hourlyRate: 0, info1: '0', info2: '0', info3: '0'}

  }

  ngOnInit(): void {

    this.selectetTreatment();
    console.log(this.selectedTreatment.name);
  }

  selectetTreatment(){
    this.selectedTreatment = history.state.data as ServicesModel;
  }

}

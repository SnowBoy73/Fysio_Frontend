import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   carouselSlide = document.querySelector('.carousel-slide');
   carouselImages = document.querySelector('.carousel-slide img');
   // Buttons

   prevBtn = document.querySelector('#prevBtn');
   nextBtn = document.querySelector('#nextBtn');

  //counter
   counter = 1;
   size: undefined;
  constructor() { }


  ngOnInit(): void {
    if(this.carouselImages != null){
      let size: number;
      // @ts-ignore
      size = this.carouselImages[0].clientWidth;
    }


  }



}

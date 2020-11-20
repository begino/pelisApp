import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Swiper from 'swiper';

import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() peliculas: Movie[];

  mySwiper: Swiper;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
    });

  }

  onSlideNext(): void {
    this.mySwiper.slideNext();
  }

  onSlidePrev(): void {
    this.mySwiper.slidePrev();
  }

}

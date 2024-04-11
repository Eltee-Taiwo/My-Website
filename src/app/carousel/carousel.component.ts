import { Component, OnInit } from '@angular/core';

class CarouselItem {
  index: number;
  thumbImage: string;
  title: string;
  description: string;
  rank: number;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  carouselItems: Array<CarouselItem> = [
    { index: 0, rank: -1, thumbImage: './assets/carousel_items/website.png', title: 'Websites', description: '' },
    { index: 1, rank: -1, thumbImage: './assets/carousel_items/mobile.png', title: 'Mobile Apps', description: '' },
    { index: 3, rank: -1, thumbImage: './assets/carousel_items/API.png', title: 'APIs', description: '' },
    { index: 7, rank: -1, thumbImage: './assets/carousel_items/desktop.png', title: 'Desktop Applications', description: '' }
  ];

  ngOnInit() {  }  
}

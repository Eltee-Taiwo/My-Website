import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  itemList:string[];
  opened : boolean;
  isMobile : boolean;

  screenHeight:number;
  screenWidth:number;
  scrollPageLevel: number = 0 ;
  mobileDecider: number = 900;

  constructor() {
    this.itemList = ['SERVICES','PORTFOLIO  ', 'PRICING'];
    this.isMobile = window.innerWidth < this.mobileDecider? true : false;

  }

  ngOnInit(): void {
  }

  toggleList(){
    this.opened = !this.opened;
    console.log(`toggle state: ${this.opened}`);
    
  }

  @HostListener("window:resize", [])
  private onResize() {
      // console.log("This window has been resized")
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      
      if ( this.screenWidth < this.mobileDecider ) {
        this.opened = false;
        this.isMobile = true;
      } else {
        this.opened = true;
        this.isMobile = false;
      }
      // console.log(`screen height: ${this.screenHeight} screen width: ${this.screenWidth}`);
  }

  // @HostListener('window:scroll', ['$event']) 
  // onScrollEvent($event){
  //   console.log($event);
  //   console.log("scrolling");
  // } 

  @HostListener('window:scroll', ['$event'])
  onScroll($event){
    this.scrollPageLevel =  
    document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
    // console.log("scroll data", this.scrollPageLevel);
  }

}

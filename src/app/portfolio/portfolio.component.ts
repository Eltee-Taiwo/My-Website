import { Component, OnInit } from '@angular/core';

class PortfolioItem {
  image: string;
  name: string;
  date: string;
  description: string;
  url: string;
  category: string;
  type: PortfolioType;
  androidLink?: string;
  iosLink?: string;
}

enum PortfolioType {
  MobileApp,
  Website
}

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {
  PortfolioType = PortfolioType;
  portfolioData: Array<PortfolioItem> = [
    {
      image: '/assets/portfolio/mennonite.png',
      name: 'Mennonite Manners',
      date: '2022',
      description: `A cross platform mobile game built with the MAUI framework. This game uses SignalR to handle realtime 
      communications between the players and the game server. SignalR HUB is hosted in Azure and a SQL Server to store data.`,
      url: 'https://www.blackbizapp.ca/',
      category: 'Mobile App',
      type: PortfolioType.MobileApp,
      androidLink: 'https://play.google.com/store/apps/details?id=taiwotech.mennonitemanners.app&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1',
      iosLink: 'https://apps.apple.com/us/app/mennonite-manners/id6444671178'
    },
    {
      image: '/assets/portfolio/blackbiz.png',
      name: 'Blackbiz',
      date: '2021',
      description: `A cross platform mobile app built with the Xamarin Framework. This app is a business directory to promote 
      local black owned businesses in Manitoba. Data is saved and retrieved by communicating with a REST API hosted in 
      Azure backed by a SQL Server database.`,
      url: 'https://www.blackbizapp.ca/',
      category: 'Mobile App',
      type: PortfolioType.MobileApp,
      androidLink: 'https://play.google.com/store/apps/details?id=com.taiwotech.blackbiz',
      iosLink: 'https://apps.apple.com/us/app/blackbiz/id1520923729'
    },
    {
      image: '/assets/portfolio/timesleeper.png',
      name: 'Time Sleeper (Teaser)',
      date: '2018',
      description: `Built from scratch without any supporting frameworks, the highlight of the TimeSleeper teaser site
      is the stargaze effect which mixes dynamic and static stars to create an experience that you just want to stare at
      forever (really  20 seconds).`,
      url: 'https://teaser.timesleeper.com/',
      category: "Website",
      type: PortfolioType.Website
    },
    {
      image: '/assets/portfolio/boatent.png',
      name: 'BOAT Entertainment',
      date: '2017',
      description: `This website was built with a mixture of two technology stacks. The front end is build on WordPress and
      features several custom plugins written in PHP as well as custom design elements. An ASP.NET MVC app was written to
      manage all admin functions and generate site content from youtube videos.`,
      url: 'https://boatent.com/',
      category: 'Website',
      type: PortfolioType.Website
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

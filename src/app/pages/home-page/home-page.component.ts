import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  articles = [
    {id: "version-0.1.1-update", title: "Version 0.1.1 Update", img: "banner.png", text: "<ul><li>hello</li></ul>", timestamp: new Date().getTime()},
    {id: "version-0.1.3-update", title: "Version 0.1.3 Update", img: "banner.png", text: "<ul><li>hello</li></ul>", timestamp: new Date().getTime()},
    {id: "version-0.1.4-update", title: "Version 0.1.4 Update", img: "banner.png", text: "<ul><li>hello</li></ul>", timestamp: new Date().getTime()},
    {id: "version-0.1.5-update", title: "Version 0.1.5 Update", img: "banner.png", text: "<ul><li>hello</li></ul>", timestamp: new Date().getTime()},
  ]
  constructor() { }

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagethree',
  templateUrl: './pagethree.component.html',
  styleUrls: ['./pagethree.component.css']
})
export class PagethreeComponent implements OnInit {

  constructor() { }

  activeTab: string = 'selection'; // Default active tab

  ngOnInit(): void {
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

}

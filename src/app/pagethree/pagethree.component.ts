import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-pagethree',
  templateUrl: './pagethree.component.html',
  styleUrls: ['./pagethree.component.css']
})
export class PagethreeComponent implements OnInit {
  environment = environment;   // expose environment to HTML

  constructor() { }

  activeTab: string = 'selection'; // Default active tab

  ngOnInit(): void {
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

}

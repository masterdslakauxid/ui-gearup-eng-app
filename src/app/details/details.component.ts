import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';  // Import the service

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  selectedValue: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Subscribe to the selected value from the service
    this.dataService.currentValue.subscribe(value => {
      this.selectedValue = value;
      console.log("Recevied value ", value);
    });
  }
}

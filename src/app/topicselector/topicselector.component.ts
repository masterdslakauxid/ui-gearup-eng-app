import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';  // Import the service
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-topicselector',
  templateUrl: './topicselector.component.html',
  styleUrls: ['./topicselector.component.css']
})
export class TopicselectorComponent implements OnInit {

  selectedOption: string = '';
  labeledJsonArrays: { key: string, category: string, label: string, visibility: boolean, skipWordHighlighting: boolean, wordsToBeHighlighted: string[], questions: { question: string, hint: string, answer: string[] }[] }[] = [];
  questionStartIndex!: number;
  selectedKey: string = 'PresentTense-YesOrNo-questions'; // Default selection

  options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];
  selectedCategory: string = '';  // To store the selected option
  categories: string[] = ['Select'];

  constructor(private http: HttpClient, private dataService: DataService, private route: ActivatedRoute) {
    const selectedCategoryLocal = sessionStorage.getItem('selectedCategory');
    if (selectedCategoryLocal) {
      this.selectedCategory = selectedCategoryLocal;
    } else {
      this.selectedCategory = "Select";
    }

  }
  ngOnInit(): void {

    // Retrieve 'isasmin' query parameter
    this.route.queryParams.subscribe(params => {
      const isasmin = params['isadmin'];

      // Store in session storage
      if (isasmin) {
        sessionStorage.setItem('isadmin', isasmin);
      }
    });

    const isadminValue = sessionStorage.getItem('isadmin');
    console.log(isadminValue); // Logs the value of 'isasmin'


    let path = "";
    if (this.isLocalhost()) {
      path = 'assets/questions-alltenses-labeled.json';
    } else {
      path = 'https://gearupengx.s3.ap-south-1.amazonaws.com/inputs/questions-alltenses-labeled.json';
    }
    this.http.get<{ key: string, category: string, label: string, visibility: boolean, skipWordHighlighting: boolean, wordsToBeHighlighted: string[], questions: { question: string, hint: string, answer: string[] }[] }[]>(path)
      .subscribe(data => {
        this.labeledJsonArrays = data.filter(item => {
          const isVisible = item.visibility;
          return isVisible || isadminValue;
        });
        this.labeledJsonArrays.forEach(element => {
          if (!this.categories.includes(element.category)) {
            this.categories.push(element.category);
          }
        });
      });
  }


  isLocalhost(): boolean {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1';
  }

  onSelect(event: Event) {
    this.questionStartIndex = 0;
    sessionStorage.setItem('selectedCategory', this.selectedCategory);
    const selectElement = event.target as HTMLSelectElement;  // Cast the event target to HTMLSelectElement
    const value = selectElement.value;  // Now you can access the 'value' property
    this.selectedOption = value;
    //this.dataService.changeSelectedValue(value);  // Update the service with selected value
  }

  onArraySelectionChange(label: string): void {
    console.log("Clearing the previous question because it's a new selection");
    //this.previousQuestions = [];
    this.questionStartIndex = 0;
    //this.selectedKey = label;
    sessionStorage.setItem('selectedLabel', label);
    this.dataService.changeSelectedValue(label);

    //this.stopTimer();
    // this.startTimer();
    // this.loadSelectedJson();
    //this.loadSelectedJson();  //moved to setActive tab methods    
  }



}

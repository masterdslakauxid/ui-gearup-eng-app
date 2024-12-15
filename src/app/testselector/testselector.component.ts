import { Component, OnInit } from '@angular/core';
import { TestUtilService } from '../testutil.service'; // Import the service
import { HttpClient } from '@angular/common/http';
import { TestDataService } from '../testdata.service';

@Component({
  selector: 'app-testselector',
  templateUrl: './testselector.component.html',
  styleUrls: ['./testselector.component.css']
})
export class TestselectorComponent implements OnInit {

  constructor(private testUtilService: TestUtilService, private http: HttpClient, private testDataService: TestDataService) { }

  categories: string[] = ['Select'];
  selectedOption: string = '';
  categoriesNew: { id: number, topicName: string }[] = [];
  showResults: boolean = false;
  questionsArr: { questionId: number, questionText: string, options: string[] }[] = [];
  labeledJsonArrays: { key: string, category: string, label: string, visibility: boolean, skipWordHighlighting: boolean, wordsToBeHighlighted: string[], questions: { questionId: string, questionText: string, options: string[] }[] }[] = [];
  selectedTestCategory: string = '';  // To store the selected option
  selectedKey: string = 'PresentTense-YesOrNo-questions'; // Default selection

  topicOrder = new Map([
    ["Present Tense- Pre-assessment", 1],
    ["Present Tense- Post-assessment", 2],
    ["Future Tense", 3],
    ["Stativ verbs", 4],
    ["Prepositions(abstract nouns)", 5],
    ["Tongue Twisters", 6],
    ["Gerunds", 7],
    ["Miscellaneous", 8]]);

  ngOnInit(): void {
    this.questionsArr.push({ questionId: 1, questionText: "What is the first1 option?", options: ["Select", "Option A", "Option B", "Option C"] });
    this.questionsArr.push({ questionId: 2, questionText: "What is the second2 option?", options: ["Select", "Option A", "Option B", "Option C"] });
    this.questionsArr.push({ questionId: 3, questionText: "What is the Third3 option?", options: ["Select", "Option A", "Option B", "Option C"] });

    let path = this.testUtilService.getPath();

    this.http.get<{ key: string, category: string, label: string, visibility: boolean, skipWordHighlighting: boolean, wordsToBeHighlighted: string[], questions: { questionId: string, questionText: string, options: string[] }[] }[]>(path)
      .subscribe(data => {
        this.labeledJsonArrays = data.filter(item => {
          const isVisible = item.visibility;
          // return isVisible || isadminValue;
          return isVisible;
        });
        //console.log(" Test selector -  no. of this.labeledJsonArrays.. ", this.labeledJsonArrays.length);
        this.labeledJsonArrays.forEach(element => {
          // console.log("element.category", element.category);
          if (!this.categories.includes(element.category)) {
            this.categories.push(element.category);
            let id1 = Number(this.topicOrder.get(element.category));
            let topicName1 = element.category;
            // console.log(".....>", id1, topicName1);
            let item: any = { "id": id1, "topicName": topicName1 };
            // console.log(item);
            this.categoriesNew.push(item);
          }
        });
        this.categoriesNew.sort((a, b) => a.id - b.id);

      });
    //  console.log(" Test selectoor no. of this.labeledJsonArrays.. ", this.labeledJsonArrays.length);
  }
  changeValue(): void {
    this.showResults = false;
  }
  onArraySelectionChange(label: string): void {
    sessionStorage.setItem('selectedTestLabel', label);
    this.testDataService.changeSelectedValue(label);

  }
  onSelect(event: Event) {
    //this.questionStartIndex = 0;
    sessionStorage.setItem('selectedTestCategory', this.selectedTestCategory);
    const selectElement = event.target as HTMLSelectElement;  // Cast the event target to HTMLSelectElement
    const value = selectElement.value;  // Now you can access the 'value' property
    this.selectedOption = value;
    //this.dataService.changeSelectedValue(value);  // Update the service with selected value
  }


}

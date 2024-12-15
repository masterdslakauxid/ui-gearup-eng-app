import { Component, OnInit } from '@angular/core';
import { TestUtilService } from '../testutil.service'; // Import the service
import { HttpClient } from '@angular/common/http';
import { AnswerService } from '../answer.service';
import { TestDataService } from '../testdata.service';

@Component({
  selector: 'app-testdetails',
  templateUrl: './testdetails.component.html',
  styleUrls: ['./testdetails.component.css']
})
export class TestdetailsComponent implements OnInit {

  constructor(private testUtilService: TestUtilService, private http: HttpClient, private answerService: AnswerService, private testDataService: TestDataService) { }

  selectedValue: string = '';
  showResults: boolean = false;
  showDetailSection: boolean = false;
  questionsArr: { questionId: string, questionText: string, options: string[] }[] = [];
  labeledJsonArrays: { key: string, category: string, label: string, visibility: boolean, skipWordHighlighting: boolean, wordsToBeHighlighted: string[], questions: { questionId: string, questionText: string, options: string[] }[] }[] = [];
  questionsAndAnswers: { questionId: string, questionText: string, options: string[] }[] = [];
  selectedKey: string = 'Present-001'; // Default selection

  ngOnInit(): void {
    this.testDataService.currentValue.subscribe(value => {
      this.selectedValue = value;
      this.selectedKey = value;
      this.loadQuestions();
      this.loadSelectedJson();
      this.answerService.selectedTestKey(value);
      this.showResults = false;
      this.showDetailSection = true;
      this.answerService.loadAnswers();
      console.log("Test Detail : Recevied value ", value);
    });


  }



  loadQuestions(): void {
    let path = this.testUtilService.getPath();
    this.http.get<{ key: string, category: string, label: string, visibility: boolean, skipWordHighlighting: boolean, wordsToBeHighlighted: string[], questions: { questionId: string, questionText: string, options: string[] }[] }[]>(path)
      .subscribe(data => {
        this.labeledJsonArrays = data.filter(item => {
          const isVisible = item.visibility;
          // return isVisible || isadminValue;
          return isVisible;
        });
        // console.log(" Test details -  no. of this.labeledJsonArrays..>>>> ", this.labeledJsonArrays.length);
        this.loadSelectedJson();
      });
  }

  changeValue(): void {
    this.showResults = false;
  }

  loadSelectedJson(): void {
    // console.log(" Test details : selectedKey  ", this.selectedKey);
    const selectedArray = this.labeledJsonArrays.find(array => array.key === this.selectedKey);
    if (selectedArray) {
      this.questionsAndAnswers = selectedArray.questions;
    }
  }
}

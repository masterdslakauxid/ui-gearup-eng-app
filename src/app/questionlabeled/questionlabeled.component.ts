// question.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-questionlabeled',
  templateUrl: './questionlabeled.component.html',
  styleUrls: ['./questionlabeled.component.css']
})
export class QuestionLabeledComponent implements OnInit {

  labeledJsonArrays: { label: string, questions: { question: string, hint: string, answer: string }[] }[] = [];
  jsonArrays: { question: string, hint: string, answer: string }[][] = [];
  previousQuestions: number[] = [];

  typeOfQuestions: { name: string, enabled: boolean }[] = [
    {
      "name": "Present Tense",
      "enabled": true
    },
    {
      "name": "Present continuous Tense",
      "enabled": true
    },
    {
      "name": "Present Perfect Tense",
      "enabled": true
    },
    {
      "name": "Present Perfect continuous Tense",
      "enabled": true
    },
    {
      "name": "Present Tense - All",
      "enabled": false
    }
  ];

  questionsAndAnswers: { question: string, hint: string, answer: string }[] = [];


  //Code begins..............................................................
  currentQuestion: string | undefined;
  currentHint: string | undefined;
  currentAnswer: string | undefined;
  showAnswer: boolean = false;
  timerSubscription: Subscription | undefined;
  selectedArrayIndex: number = 0; // Default selection
  activeTab: string = 'selection'; // Default active tab
  selectedLabel: string = 'PresentTense-YesOrNo-questions'; // Default selection
  selectedInterval: number = 5; // Default interval in seconds
  showAnswerOption: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadQuestions();
    this.loadSelectedJson();
    this.retrieveSelectedArrayIndex();
    this.startTimer();
    this.retrieveShowAnswer();
  }

  loadSelectedJson(): void {
    const selectedArray = this.labeledJsonArrays.find(array => array.label === this.selectedLabel);
    if (selectedArray) {
      this.questionsAndAnswers = selectedArray.questions;
      this.loadRandomQuestion();
    }
  }

  onArraySelectionChange(label: string): void {
    console.log("Clearing the previous question because it's a new selection");
    this.previousQuestions = [];
    this.selectedLabel = label;
    sessionStorage.setItem('selectedLabel', label);
    this.loadSelectedJson();
  }

  retrieveSelectedLabel(): void {
    const storedLabel = sessionStorage.getItem('selectedLabel');
    if (storedLabel) {
      this.selectedLabel = storedLabel;
    }
  }

  onShowAnswerChange(event: any): void {
    this.showAnswerOption = event.target.value;
    sessionStorage.setItem('showAnswerOption', this.showAnswerOption.toString());
    //this.startTimer();
  }

  retrieveShowAnswer(): void {
    const showAnswerOption = sessionStorage.getItem('showAnswerOption');
    if (showAnswerOption !== null) {
      this.showAnswerOption = JSON.parse(showAnswerOption);
    }
  }


  onIntervalChange(event: any): void {
    this.selectedInterval = event.target.value;
    sessionStorage.setItem('selectedInterval', this.selectedInterval.toString());
    this.startTimer();
  }

  retrieveSelectedArrayIndex(): void {
    const storedIndex = sessionStorage.getItem('selectedArrayIndex');
    if (storedIndex !== null) {
      this.selectedArrayIndex = +storedIndex;
    }
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }


  loadQuestions(): void {  // uncomment this to load from database.
    this.http.get<{ label: string, questions: { question: string, hint: string, answer: string }[] }[]>('https://gearupengx.s3.ap-south-1.amazonaws.com/inputs/questions-alltenses-labeled.json')
      .subscribe(data => {
        this.labeledJsonArrays = data;
        this.loadSelectedJson();
        this.retrieveSelectedLabel();
        this.startTimer();
      });
  }

  loadRandomQuestion(): void {
    if (this.questionsAndAnswers.length === 0) return;

    if (this.questionsAndAnswers.length == this.previousQuestions.length) {
      this.previousQuestions = [];
      console.log("Completed all questions.. starting again");
    }
    const randomIndex = Math.floor(Math.random() * this.questionsAndAnswers.length);
    if (!this.previousQuestions.includes(randomIndex)) {
      this.currentQuestion = this.questionsAndAnswers[randomIndex].question;
      this.currentHint = this.questionsAndAnswers[randomIndex].hint;
      this.currentAnswer = this.questionsAndAnswers[randomIndex].answer;
      this.retrieveShowAnswer();
      this.showAnswer = this.showAnswerOption; // Hide the answer initially
      this.previousQuestions.push(randomIndex);
      //console.log("randomIndex -> " + randomIndex);
    } else {
      this.loadRandomQuestion();
    }
  }

  revealAnswer(): void {
    this.showAnswer = true; // Show the answer when the button is clicked
  }

  startTimer(): void {
    this.stopTimer();
    this.timerSubscription = interval(this.selectedInterval * 1000).subscribe(() => this.loadRandomQuestion());
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}

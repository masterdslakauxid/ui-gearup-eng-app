// question.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-questiontimed',
  templateUrl: './questiontimed.component.html',
  styleUrls: ['./questiontimed.component.css']
})
export class QuestionTimedComponent implements OnInit {

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadQuestions();  // uncomment this to load from database    
    this.retrieveSelectedArrayIndex();
    //this.loadSelectedJson();
    // this.startTimer();
  }

  loadSelectedJson(): void {
    if (this.jsonArrays.length === 0) return;

    this.questionsAndAnswers = this.jsonArrays[this.selectedArrayIndex];
    this.loadRandomQuestion();
  }

  onArraySelectionChange(index: number): void {
    console.log("Clearing the previous question because it's a new selection");
    this.previousQuestions = [];
    this.selectedArrayIndex = index;
    sessionStorage.setItem('selectedArrayIndex', index.toString());
    this.loadSelectedJson();
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
    this.http.get<{ question: string, hint: string, answer: string }[][]>('https://gearupengx.s3.ap-south-1.amazonaws.com/inputs/questions-alltenses.json')
      .subscribe(data => {
        this.jsonArrays = data;
        this.loadSelectedJson();
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
      this.showAnswer = true; // Hide the answer initially
      this.previousQuestions.push(randomIndex);
      console.log("randomIndex -> " + randomIndex);
    } else {
      this.loadRandomQuestion();
    }
  }

  revealAnswer(): void {
    this.showAnswer = true; // Show the answer when the button is clicked
  }

  startTimer(): void {
    this.timerSubscription = interval(2000).subscribe(() => this.loadRandomQuestion()); // Change 10000 to your desired interval in milliseconds
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}

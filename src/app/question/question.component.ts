// question.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionsAndAnswers: { question: string, hint: string, answer: string }[] = [];
  currentQuestion: string | undefined;
  currentHint: string | undefined;
  currentAnswer: string | undefined;
  showAnswer: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.http.get<{ question: string, hint: string, answer: string }[]>('https://gearupengx.s3.ap-south-1.amazonaws.com/questions-plural-alltenses.json')
      .subscribe(data => {
        this.questionsAndAnswers = data;
        this.loadRandomQuestion();
      });
  }

  loadRandomQuestion(): void {
    if (this.questionsAndAnswers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * this.questionsAndAnswers.length);
    this.currentQuestion = this.questionsAndAnswers[randomIndex].question;
    this.currentHint = this.questionsAndAnswers[randomIndex].hint;
    this.currentAnswer = this.questionsAndAnswers[randomIndex].answer;
    this.showAnswer = false; // Hide the answer initially
  }

  revealAnswer(): void {
    this.showAnswer = true; // Show the answer when the button is clicked
  }
}

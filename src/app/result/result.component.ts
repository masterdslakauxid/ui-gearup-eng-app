import { Component, OnInit } from '@angular/core';
import { AnswerService } from '../answer.service'; // Import the service

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  results: { questionId: number; isCorrect: boolean }[] = [];
  constructor(private answerService: AnswerService) { }

  ngOnInit() {
    const userAnswers = this.answerService.getUserAnswers();
    this.results = userAnswers.map((answer) => ({
      questionId: answer.questionId,
      isCorrect: this.answerService.isAnswerCorrect(answer.questionId),
    }));
  }

}






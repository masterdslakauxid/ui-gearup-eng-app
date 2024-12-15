import { Component, OnInit } from '@angular/core';
import { AnswerService } from '../answer.service'; // Import the service

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  results: { questionId: string; isCorrect: boolean }[] = [];
  constructor(private answerService: AnswerService) {

  }
  percentage!: number;

  ngOnInit() {
    const userAnswers = this.answerService.getUserAnswers();


    this.results = userAnswers.map((answer) => ({
      questionId: answer.questionId,
      isCorrect: this.answerService.isAnswerCorrect(answer.questionId),
    }));
    this.percentage = this.calculateCorrectPercentage(this.results);
  }

  calculateCorrectPercentage(results: { questionId: string; isCorrect: boolean }[]): number {
    const totalQuestions = results.length;
    if (totalQuestions === 0) {
      return 0; // Handle case where no questions exist
    }
    const correctAnswers = results.filter(result => result.isCorrect).length;
    const percentage = (correctAnswers / totalQuestions) * 100;
    return percentage;
  }

}






import { Component, Input, OnInit } from '@angular/core';
import { AnswerService } from '../answer.service'; // Import the service

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input() questionId!: string; // Get question ID via input binding
  @Input() questionText!: string;
  @Input() options: string[] = [];

  selectedOption: string = '';

  constructor(private answerService: AnswerService) { }

  onSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;  // Cast the event target to HTMLSelectElement
    const value = selectElement.value;  // 
    this.answerService.addAnswer(this.questionId, value); // Add answer to service
    console.log("selected answer", value);
  }

}
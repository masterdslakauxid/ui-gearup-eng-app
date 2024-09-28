import { Component } from '@angular/core';

@Component({
  selector: 'app-page-two',
  templateUrl: './pagetwo.component.html',
  styleUrls: ['./pagetwo.component.css']
})
export class PageTwoComponent {
  showResults: boolean = false;
  questionsArr: { questionId: number, questionText: string, options: string[] }[] = [];
  ngOnInit(): void {
    this.questionsArr.push({ questionId: 1, questionText: "What is the first1 option?", options: ["Select", "Option A", "Option B", "Option C"] });
    this.questionsArr.push({ questionId: 2, questionText: "What is the second2 option?", options: ["Select", "Option A", "Option B", "Option C"] });
    this.questionsArr.push({ questionId: 3, questionText: "What is the Third3 option?", options: ["Select", "Option A", "Option B", "Option C"] });
  }

}

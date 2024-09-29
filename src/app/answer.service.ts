import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestUtilService } from './testutil.service';

@Injectable({
    providedIn: 'root',
})
export class AnswerService {
    private userAnswers: { questionId: string; answer: string }[] = [];

    selectedKey: string = 'Present-001'; // Default selection
    correctAnswersJson: { questionId: string, correctAnswer: string }[] = [];

    questionsArr: { questionId: number, questionText: string, options: string[] }[] = [];
    labeledJsonArrays: {
        key: string, category: string, label: string, visibility: boolean, skipWordHighlighting: boolean,
        wordsToBeHighlighted: string[],
        questions: { questionId: string, questionText: string, options: string[] }[], answers: { questionId: string, correctAnswer: string }[]
    }[] = [];

    constructor(private testUtilService: TestUtilService, private http: HttpClient) { }

    ngOnInit(): void {
    }

    resetUserAnswers() {
        this.userAnswers = [];
    }
    selectedTestKey(value: string) {
        this.selectedKey = value;
    }

    loadAnswers() {
        this.resetUserAnswers();
        let path = this.testUtilService.getPath();

        this.http.get<{ key: string, category: string, label: string, visibility: boolean, skipWordHighlighting: boolean, wordsToBeHighlighted: string[], questions: { questionId: string, questionText: string, options: string[] }[], answers: { questionId: string, correctAnswer: string }[] }[]>(path)
            .subscribe(data => {
                this.labeledJsonArrays = data.filter(item => {
                    const isVisible = item.visibility;
                    // return isVisible || isadminValue;
                    return isVisible;
                });
                //console.log(" Answer service -  no. of this.labeledJsonArrays..>> ", this.labeledJsonArrays.length);
                this.loadSelectedJson();
            });
        // console.log(" Answer service no. of this.labeledJsonArrays..<< ", this.labeledJsonArrays.length);
    }

    loadSelectedJson(): void {
        // console.log("Is it loading answers for the new set?  ", this.selectedKey);
        const selectedArray = this.labeledJsonArrays.find(array => array.key === this.selectedKey);
        if (selectedArray) {
            this.correctAnswersJson = selectedArray.answers;
        }
    }

    // Add user answer for a specific question
    addAnswer(questionId: string, answer: string) {
        const existingAnswer = this.userAnswers.find(
            (ans) => ans.questionId === questionId
        );
        if (existingAnswer) {
            existingAnswer.answer = answer; // Update the existing answer
        } else {
            this.userAnswers.push({ questionId, answer });
        }
    }

    // Get all the user's answers
    getUserAnswers() {
        return this.userAnswers;
    }

    // Get the correct answers
    getCorrectAnswers() {
        return this.correctAnswersJson;
    }

    // Check whether the user's answer for a specific question is correct
    isAnswerCorrect(questionId: string) {
        const userAnswer = this.userAnswers.find(
            (ans) => ans.questionId === questionId
        );
        console.log(" Answer Service:  User Answer ", userAnswer);
        const correctAnswer = this.correctAnswersJson.find(
            (ans) => ans.questionId === questionId
        );
        console.log("Answer Service:  correctAnswer  ", correctAnswer);
        return userAnswer?.answer === correctAnswer?.correctAnswer;
    }

}
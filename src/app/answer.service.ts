import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AnswerService {
    private userAnswers: { questionId: number; answer: string }[] = [];
    private correctAnswers: { questionId: number; correctAnswer: string }[] = [
        { questionId: 1, correctAnswer: 'Option A' },
        { questionId: 2, correctAnswer: 'Option B' },
        { questionId: 3, correctAnswer: 'Option C' },
    ];

    constructor() { }

    // Add user answer for a specific question
    addAnswer(questionId: number, answer: string) {
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
        return this.correctAnswers;
    }

    // Check whether the user's answer for a specific question is correct
    isAnswerCorrect(questionId: number) {
        const userAnswer = this.userAnswers.find(
            (ans) => ans.questionId === questionId
        );
        const correctAnswer = this.correctAnswers.find(
            (ans) => ans.questionId === questionId
        );
        return userAnswer?.answer === correctAnswer?.correctAnswer;
    }
}

// question.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-questionlabeled',
  templateUrl: './questionlabeled.component.html',
  styleUrls: ['./questionlabeled.component.css']
})
export class QuestionLabeledComponent implements OnInit {

  labeledJsonArrays: { key: string, label: string, visibility: boolean, skipWordHighlighting: boolean, wordsToBeHighlighted: string[], questions: { question: string, hint: string, answer: string }[] }[] = [];
  jsonArrays: { question: string, hint: string, answer: string }[][] = [];
  previousQuestions: number[] = [];
  questionsAndAnswers: { question: string, hint: string, answer: string }[] = [];
  skipWordHighlighting: boolean | undefined;
  wordsToBeHighlighted: string[] = ["Consider bringing:", "Avoid eating:", "finished writing:"];

  //To highlight the auxillary verbs and pronouns
  wordsToBeHighlightedGlbl = ['am', 'is', 'are', 'was', 'were', 'being', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'can', 'could', 'he', 'she', 'it', 'I', 'We', 'they', 'you'];

  currentQuestion: string | undefined;
  currentHint: string | undefined;
  currentAnswer: string | undefined;
  showAnswer: boolean = false;
  timerSubscription: Subscription | undefined;
  selectedArrayIndex: number = 0; // Default selection
  activeTab: string = 'selection'; // Default active tab
  selectedKey: string = 'PresentTense-YesOrNo-questions'; // Default selection
  selectedInterval: number = 5; // Default interval in seconds
  showAnswerOption: boolean = false;
  showHint: boolean = false;

  displayPatterns: string[] = ['Sequential', 'Random'];
  selecteddisplayPattern: string = '';  // To store the selected option

  sentence: string | undefined;
  boldWord: string | undefined;
  processedSentence: SafeHtml | undefined;
  processedCurrentQuestion: SafeHtml | undefined;
  processedCurrentAnswer: SafeHtml | undefined;
  questionStartIndex!: number;
  // enableModules!: string[];


  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.questionStartIndex = 0;
    // Load the selection from sessionStorage if it exists
    const localSelectedDisplayPattern = sessionStorage.getItem('selectedDisplayPattern');
    if (localSelectedDisplayPattern) {
      this.selecteddisplayPattern = localSelectedDisplayPattern;
    } else {
      this.selecteddisplayPattern = "Sequential";
    }
  }

  ngOnInit(): void {

    this.loadQuestions();
    this.loadSelectedJson();
    this.retrieveSelectedArrayIndex();
    this.startTimer();
    this.retrieveShowAnswer();
    this.retrieveShowHint();

    const data = {
      sentence: "This is an example sentence.",
      boldWord: "example"
    };

    this.sentence = data.sentence;
    this.boldWord = data.boldWord;
  }

  loadQuestions(): void {  // uncomment this to load from database.
    // Assuming enableModules is stored as a string array in session storage
    const enableModules = JSON.parse(sessionStorage.getItem('enableModules') || '[]') as string[];
    console.log(" ----->enableModules", enableModules);
    console.log(" ----->this.enableModules.includes(item.key)", enableModules.includes("Present-002"));

    this.http.get<{ key: string, label: string, visibility: boolean, skipWordHighlighting: boolean, wordsToBeHighlighted: string[], questions: { question: string, hint: string, answer: string }[] }[]>('https://gearupengx.s3.ap-south-1.amazonaws.com/inputs/questions-alltenses-labeled.json')
      //this.http.get<{ key: string, label: string, visibility: boolean, skipWordHighlighting: boolean, wordsToBeHighlighted: string[], questions: { question: string, hint: string, answer: string }[] }[]>('assets/questions-alltenses-labeled.json')
      .subscribe(data => {
        this.labeledJsonArrays = data.filter(item => {
          const isVisible = item.visibility;
          const isInEnabledModules = enableModules.includes(item.key);
          console.log('Item:', item, 'isVisible:', isVisible, 'isInEnabledModules:', isInEnabledModules);
          console.log('isVisible || isInEnabledModules', (isVisible || isInEnabledModules));
          return isVisible || isInEnabledModules || enableModules.includes("all");
        });
        this.loadSelectedJson();
        this.retrieveSelectedLabel();
        this.startTimer();
      });
  }

  loadSelectedJson(): void {
    const selectedArray = this.labeledJsonArrays.find(array => array.key === this.selectedKey);
    if (selectedArray) {
      //if (selectedArray.visibility == true) {
      this.questionsAndAnswers = selectedArray.questions;
      this.skipWordHighlighting = selectedArray.skipWordHighlighting;
      //this.wordsToBeHighlighted = selectedArray.wordsToBeHighlighted;
      console.log("failed to get the value .....wordsToBeHighlighted ", this.wordsToBeHighlighted);
      // console.log("failed to get the value .....selectedArray.Label ", selectedArray.label);
      // console.log("failed to get the value .....selectedArray.visibility ", selectedArray.visibility);
      // console.log("failed to get the value .....selectedArray.skipWordHighlighting ", selectedArray.skipWordHighlighting);
      this.loadRandomQuestion();
      //}
    }
  }

  onArraySelectionChange(label: string): void {
    console.log("Clearing the previous question because it's a new selection");
    this.previousQuestions = [];
    this.questionStartIndex = 0;
    this.selectedKey = label;
    sessionStorage.setItem('selectedLabel', label);
    this.stopTimer();
    this.startTimer();
    this.loadSelectedJson();
    //this.loadSelectedJson();  //moved to setActive tab methods    
  }

  retrieveSelectedLabel(): void {
    const storedLabel = sessionStorage.getItem('selectedLabel');
    if (storedLabel) {
      this.selectedKey = storedLabel;
    }
  }

  onDisplayPatternChange(event: any): void {
    this.questionStartIndex = 0;
    sessionStorage.setItem('selecteddisplayPattern', this.selecteddisplayPattern);
  }

  onShowAnswerChange(event: any): void {
    this.showAnswerOption = event.target.value;
    sessionStorage.setItem('showAnswerOption', this.showAnswerOption.toString());
  }

  onShowHintChange(event: any): void {
    this.showHint = event.target.value;
    sessionStorage.setItem('showHint', this.showHint.toString());
  }

  retrieveShowAnswer(): void {
    const showAnswerOption = sessionStorage.getItem('showAnswerOption');
    if (showAnswerOption !== null) {
      this.showAnswerOption = JSON.parse(showAnswerOption);
    }
  }

  retrieveShowHint(): void {
    const showHint = sessionStorage.getItem('showHint');
    if (showHint !== null) {
      this.showHint = JSON.parse(showHint);
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



  loadRandomQuestion(): void {
    if (this.questionsAndAnswers.length === 0) return;

    if (this.questionsAndAnswers.length == this.previousQuestions.length) {
      this.previousQuestions = [];
      this.questionStartIndex = 0;
      console.log("Completed all questions.. starting again");
    }

    let randomIndex: number;
    let num!: number;

    console.log("Selected display pattern..................>", this.selecteddisplayPattern);
    if (this.selecteddisplayPattern == "Sequential") {
      num = this.questionStartIndex;
      console.log(" I'm Sequential block", num);
      this.questionStartIndex = this.questionStartIndex + 1;
    } else if (this.selecteddisplayPattern == "Random") {
      this.questionStartIndex = 0;
      num = Math.floor(Math.random() * this.questionsAndAnswers.length);
      console.log(" I'm Random block", num);
    }
    randomIndex = num;
    //const randomIndex = Math.floor(Math.random() * this.questionsAndAnswers.length);
    if (!this.previousQuestions.includes(randomIndex)) {
      if (this.skipWordHighlighting == false) {
        this.processedCurrentQuestion = this.processSentence(this.questionsAndAnswers[randomIndex].question);
      } else {
        this.processedCurrentQuestion = this.questionsAndAnswers[randomIndex].question;
      }
      this.retrieveShowHint();
      if (this.showHint) {
        this.currentHint = this.questionsAndAnswers[randomIndex].hint;
      }
      if (this.showAnswerOption) {
        if (this.skipWordHighlighting == false) {
          this.processedCurrentAnswer = this.processSentence(this.questionsAndAnswers[randomIndex].answer);
        } else {
          this.processedCurrentAnswer = this.questionsAndAnswers[randomIndex].answer;
        }
      }
      this.retrieveShowAnswer();
      this.showAnswer = this.showAnswerOption; // Hide the answer initially
      this.previousQuestions.push(randomIndex);

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
    // this.startTimer(); 
    // this.loadSelectedJson();
  }

  // processSentence1(str: any) {
  //   let processed: string;
  //   this.auxiliaryVerbs.forEach(word => {
  //     const regex = new RegExp(`\\b(${word})\\b`, 'gi');
  //     str = str.replace(regex, '<strong>$1</strong>');
  //   });
  //   return this.sanitizer.bypassSecurityTrustHtml(str);
  // }

  processSentence(str: any) {
    let processed: string;
    console.log("Before processing ", this.wordsToBeHighlighted);
    this.wordsToBeHighlightedGlbl.forEach(word => {
      //console.log(" word to be replaced.......................", word);
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      str = str.replace(regex, '<strong>$1</strong>');
      //console.log(" After replacement .......................", str);
    });
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }

}

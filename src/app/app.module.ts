import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionTimedComponent } from './questiontimed/questiontimed.component';
import { QuestionLabeledComponent } from './questionlabeled/questionlabeled.component';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { UserListComponent } from './user-list/user-list.component';
import { TopicselectorComponent } from './topicselector/topicselector.component';
import { DetailsComponent } from './details/details.component';
import { QuizzComponent } from './quizz/quizz.component';
import { ResultComponent } from './result/result.component';
import { PageOneComponent } from './pageone/pageone.component';
import { PageTwoComponent } from './pagetwo/pagetwo.component';
import { TestselectorComponent } from './testselector/testselector.component';
import { TestdetailsComponent } from './testdetails/testdetails.component';
import { PagethreeComponent } from './pagethree/pagethree.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionTimedComponent,
    QuestionLabeledComponent,
    UserListComponent,
    TopicselectorComponent,
    DetailsComponent,
    QuizzComponent,
    ResultComponent,
    PageOneComponent,
    PageTwoComponent,
    TestselectorComponent,
    TestdetailsComponent,
    PagethreeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // Add HttpClientModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionTimedComponent,
    QuestionLabeledComponent,
    UserListComponent,
    TopicselectorComponent,
    DetailsComponent
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

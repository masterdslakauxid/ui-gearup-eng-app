import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionTimedComponent } from './questiontimed/questiontimed.component';
import { QuestionLabeledComponent } from './questionlabeled/questionlabeled.component';
import { FormsModule } from '@angular/forms';  // Import FormsModule


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionTimedComponent,
    QuestionLabeledComponent
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

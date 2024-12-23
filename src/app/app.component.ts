import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'grearup';
  users: any[] = [];
  modules: any = {};
  selectedUserModules: any[] = [];
  selectedUser: any = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // this.questionsArr.push({ questionId: 1, questionText: "What is the first1 option?", options: ["Select", "Option A", "Option B", "Option C"] });
    // this.questionsArr.push({ questionId: 2, questionText: "What is the second2 option?", options: ["Select", "Option A", "Option B", "Option C"] });
    // this.questionsArr.push({ questionId: 3, questionText: "What is the Third3 option?", options: ["Select", "Option A", "Option B", "Option C"] });
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
      this.loadUserModules();
    });

    this.dataService.getModules().subscribe(modules => {
      this.modules = modules;
      this.loadUserModules();
    });
  }

  onUserChange(event: any): void {
    const userId = +event.target.value;
    this.selectedUser = this.users.find(user => user.id === userId);
    sessionStorage.setItem('selectedUserId', userId.toString());
    this.loadUserModules();
  }

  loadUserModules(): void {
    if (this.selectedUser && this.modules) {
      this.selectedUserModules = this.selectedUser.modules.map((moduleName: string | number) => this.modules[moduleName]);
    }
  }

}

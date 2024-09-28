import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    private usersUrl = 'assets/users.json';
    private modulesUrl = 'assets/modules.json';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get(this.usersUrl);
    }

    getModules(): Observable<any> {
        return this.http.get(this.modulesUrl);
    }

    //for handling the topic selector
    private selectedValue = new BehaviorSubject<string>('');  // BehaviorSubject to hold the value
    currentValue = this.selectedValue.asObservable();         // Observable for components to subscribe

    changeSelectedValue(value: string) {
        this.selectedValue.next(value);  // Updates the selected value
        console.log(" the selected value is ", value);
    }
}

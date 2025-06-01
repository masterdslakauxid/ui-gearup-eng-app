import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UtilService {

    private usersUrl = 'assets/users.json';
    private modulesUrl = 'assets/modules.json';

    moduleName: string = 'common';
    dataFile: string = "data.json";

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

    getDomain(): string {
        return window.location.hostname;
    }

    getPath() {
        let path = "";
        if (this.isLocalhost()) {
            path = 'assets/inputs/modules/' + this.moduleName + '/' + this.dataFile;
        } else {
            path = this.getDomain() + '/inputs/modules/' + this.moduleName + '/' + this.dataFile;
        }
        console.log("Dynamically loading the practice set from the domain = " + path);
        return path;
    }

    isLocalhost(): boolean {
        const hostname = window.location.hostname;
        return hostname === 'localhost' || hostname === '127.0.0.1';
    }
}

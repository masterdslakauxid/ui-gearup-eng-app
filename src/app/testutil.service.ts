import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TestUtilService {

    private usersUrl = 'assets/users.json';
    private modulesUrl = 'assets/modules.json';

    moduleName: string = 'common';
    dataFile: string = "test.json";

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

    getPath() {
        let path = "";
        if (this.isLocalhost()) {
            // path = 'assets/inputs/modules/' + this.moduleName + '/' + this.dataFile;
            path = 'assets/inputs/modules/common/test.json';
        } else {
            path = 'http://englishroutines.s3-website.ap-south-1.amazonaws.com/inputs/modules/' + this.moduleName + '/' + this.dataFile;
        }
        return path;
    }

    isLocalhost(): boolean {
        const hostname = window.location.hostname;
        return hostname === 'localhost' || hostname === '127.0.0.1';
    }
}

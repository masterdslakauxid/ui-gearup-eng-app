import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}

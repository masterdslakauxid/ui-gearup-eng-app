import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserGroupsService {

    private usersUrl = 'assets/User.json'; // Path to your users JSON file
    private groupsUrl = 'assets/userGroups.json'; // Path to your user groups JSON file

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.usersUrl);
    }

    getUserGroups(): Observable<any[]> {
        return this.http.get<any[]>(this.groupsUrl);
    }

    getUsersWithGroups(): Observable<any[]> {
        return this.getUsers().pipe(
            switchMap(users => {
                return this.getUserGroups().pipe(
                    map(groups => {
                        return users.map(user => {
                            const userGroup = groups.find(group => group.user === user.userid);
                            return {
                                ...user,
                                groups: userGroup ? userGroup.usersGroups : []
                            };
                        });
                    })
                );
            })
        );
    }
}

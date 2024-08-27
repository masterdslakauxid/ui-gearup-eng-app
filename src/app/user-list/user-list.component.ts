import { Component, OnInit } from '@angular/core';
import { UserGroupsService } from './user-groups.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    usersWithGroups: any[] = [];

    constructor(private userGroupsService: UserGroupsService) { }

    ngOnInit(): void {
        this.userGroupsService.getUsersWithGroups().subscribe(users => {
            this.usersWithGroups = users;
        });
    }
}

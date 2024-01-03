import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, switchMap, startWith } from "rxjs";

import { User } from "../../core/models/user.model";
import { UserService } from "../../core/services/user.service";
import { INPUT_DEBOUNCE } from "../../constants";

/**
 * Component for users page
 */
@Component({
    styleUrls: ["users.component.scss"],
    templateUrl: "users.component.html",
})
export class UsersComponent implements OnInit {
    @Input()
    users: Array<User>;
    searchField: FormControl = new FormControl();

    constructor(public userService: UserService) {}

    ngOnInit() {
        this.searchField.valueChanges
            .pipe(
                startWith(""),
                debounceTime(INPUT_DEBOUNCE),
                distinctUntilChanged(),
                switchMap((query) => this.userService.getUsers(query))
            )
            .subscribe((users) => {
                this.users = users;
            });
    }
}
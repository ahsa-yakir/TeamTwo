import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { Profile } from '../profiles.model';
import { ProfilesService } from '../profiles.service';

@Component({
    selector: 'app-profile-create',
    templateUrl: './create-profile.component.html',
    styleUrls: ['./create-profile.component.css'],
})
export class ProfileCreateComponent implements OnInit {
    profile: Profile;
    private authStatusSub: Subscription;
    userIsAuthenticated = false;
    userId: string;
    constructor(
        public profilesService: ProfilesService,
        public route: ActivatedRoute,
        private authService: AuthService
    ) {}

    ngOnInit() {
        // this.createProfileForm = new FormGroup({
        //     firstName: new FormControl(),
        //     lastName: new FormControl(),
        //     birthDate: new FormControl(),
        //     highSchool: new FormControl(),
        //     state: new FormControl(),
        //     city: new FormControl(),
        //     country: new FormControl(),
        // });
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                this.userId = this.authService.getUserId();
            });
    }

    onImagePicked(event: Event) {}

    onSubmitProfile(form: NgForm) {
        console.log(form.value);
        if (form.invalid) {
            return;
        }
        this.profilesService.createProfile(
            form.value.firstName,
            form.value.lastName,
            form.value.birthDate,
            form.value.highSchool,
            form.value.city,
            form.value.state,
            form.value.country
        );
    }
}

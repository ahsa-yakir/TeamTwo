import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { createProfile } from './create-profile.model';

@Injectable({ providedIn: 'root' })
export class createProfileService {
    private createProfile: createProfile;
    constructor(private http: HttpClient, private router: Router) {}

    addCreateProfile(
        firstName: string,
        lastName: string,
        birthDate: Date,
        highSchool: string,
        city: string,
        state: string,
        country: string
    ) {
        const profileData = new FormData();
        profileData.append('firstName', firstName);
        profileData.append('lastName', lastName);
        profileData.append('birthDate', birthDate.toDateString());
        profileData.append('highSchool', highSchool);
        profileData.append('city', city);
        profileData.append('state', state);
        profileData.append('country', country);
        this.http
            .post<{ message: string; createProfile: createProfile }>(
                'http://localhost:3000/api/posts',
                profileData
            )
            .subscribe(responseData => {
                const createProfile: createProfile = {
                    firstName: firstName,
                    lastName: lastName,
                    birthdate: birthDate,
                    highSchool: highSchool,
                    city: city,
                    state: state,
                    country: country,
                    user_id: responseData.createProfile.user_id,
                };
                this.router.navigate(['/']);
            });
    }
}

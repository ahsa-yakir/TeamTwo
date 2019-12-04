import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Profile } from './profiles.model';

@Injectable({ providedIn: 'root' })
export class ProfilesService {
    constructor(private http: HttpClient, private router: Router) {}

    // Get one profile
    getProfile(id: string) {
        return this.http.get<{
            id: string;
            title: string;
            content: string;
            imagePath: string;
            user_id: string;
        }>('http://localhost:3000/api/posts/' + id);
    }

    createProfile(
        firstName: string,
        lastName: string,
        birthdate: Date,
        highSchool: string,
        city: string,
        state: string,
        country: string
    ) {
        const postData = new FormData();
        postData.append('firstName', firstName);
        postData.append('lastName', lastName);
        postData.append('birthdate', birthdate.toString());
        postData.append('highSchool', highSchool);
        postData.append('city', city);
        postData.append('state', state);
        postData.append('country', country);
        this.http
            .post<{ message: string; profile: Profile }>(
                'http://localhost:3000/api/player_info',
                postData
            )
            .subscribe(responseData => {
                this.router.navigate(['/']);
            });
    }
}

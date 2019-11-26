import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfilePageService {
    constructor(private http: HttpClient) {}

    getProfileData(): Observable<Object> {
        return this.http.get('http://localhost:3000/api/player_info/53');
    }
}

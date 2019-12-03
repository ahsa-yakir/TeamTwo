import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, merge, Observable, of, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProfilePageService {
    baseUrl = 'http://localhost:3000/api/';
    urls = ['player_info/', 'stats/'];

    constructor(private http: HttpClient) {}

    getProfileData(id: number) {
        return from(this.urls).pipe(
            concatMap(url => this.http.get(this.baseUrl + url + id))
        );
    }
}

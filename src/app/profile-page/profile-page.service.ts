import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, merge, Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProfilePageService {
    baseUrl = 'http://localhost:3000/api/';
    urls = ['player_info/', 'stats/'];

    constructor(private http: HttpClient) {}

    getProfileData(id: number) {
        let info = this.http.get(this.baseUrl + 'player_info/' + id);
        let stats = this.http.get(this.baseUrl + 'stats/' + id);

        return forkJoin([info, stats]);
    }
}

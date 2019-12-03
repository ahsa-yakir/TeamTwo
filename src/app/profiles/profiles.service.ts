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

    createProfile(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);
        this.http
            .post<{ message: string; profile: Profile }>(
                'http://localhost:3000/api/posts',
                postData
            )
            .subscribe(responseData => {
                // UPDATE THE VALUES BELOW TO BE WHAT A PROFILE NEEDS
                // const profile: Profile = {
                //     id: responseData.post.id,
                //     title: title,
                //     content: content,
                //     imagePath: responseData.post.imagePath,
                //     user_id: responseData.post.user_id,
                // };
                // this.posts.push(post);
                // this.router.navigate(['/']);
            });
    }
}

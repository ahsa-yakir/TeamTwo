import { Component, Input, OnInit } from '@angular/core';
import { ProfilePageService } from './profile-page.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from '../posts/posts.service';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
    @Input() playerId = 53; //default player id = 53
    profileData: {};
    statsData: {};
    userId;
    constructor(
        private profPageService: ProfilePageService,
        public route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            this.userId = paramMap.get('userId');
        });

        this.profPageService.getProfileData(this.userId).subscribe(res => {
            this.profileData = res[0];
            console.log(res[0]);
            this.statsData = Object.entries(res[1]);
        });
    }
}

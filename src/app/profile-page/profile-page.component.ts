import { Component, Input, OnInit } from '@angular/core';
import { ProfilePageService } from './profile-page.service';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
    @Input() playerId = 53; //default player id = 53
    profileData: {};
    statsData: {};
    constructor(private profPageService: ProfilePageService) {}

    ngOnInit() {
        this.profPageService.getProfileData(this.playerId).subscribe(res => {
            this.profileData = res[0];
            console.log(res[0]);
            this.statsData = Object.entries(res[1]);
        });
    }
}

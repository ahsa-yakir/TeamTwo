import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-profile-stats-pane',
    templateUrl: './profile-stats-pane.component.html',
    styleUrls: ['./profile-stats-pane.component.scss']
})
export class ProfileStatsPaneComponent implements OnInit {

    // private stats: {}[];
    // noinspection JSMismatchedCollectionQueryUpdate
    private fakeData: {}[] = [
        {
            title: 'goals',
            value: 10
        },
        {
            title: 'saves',
            value: 420
        },
        {
            title: 'Favorite Candy',
            value: 'Deez'
        },
        {
            title: 'goals',
            value: 10
        },
        {
            title: 'saves',
            value: 420
        },
        {
            title: 'Favorite Candy',
            value: 'Deez'
        },
        {
            title: 'goals',
            value: 10
        },
        {
            title: 'saves',
            value: 420
        },
        {
            title: 'Favorite Candy',
            value: 'Deez'
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }
}

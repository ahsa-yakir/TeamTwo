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
            title: 'Games',
            value: 79
        },
        {
            title: 'Goals per game',
            value: 3.2
        },
        {
            title: 'Assists per game',
            value: 1.23
        }
    ];

    private fakeAcademicData: {}[] = [
        {
            title: 'GPA',
            value: '3.99 / 4'
        },
        {
            title: 'AP / Honors Courses Taken',
            value: '32 / 36'
        },
        {
            title: 'School Rank',
            value: '1 / 600'
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-stat-display',
    templateUrl: './stat-display.component.html',
    styleUrls: ['./stat-display.component.scss'],
})
export class StatDisplayComponent implements OnInit {
    @Input() statTitle: string;
    @Input() statValue: any;

    constructor() {}

    ngOnInit() {}
}

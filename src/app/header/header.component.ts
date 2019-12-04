import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    private authListenerSubs: Subscription;
    userIsAuthenticated = false;
    userId: string;
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService
            .getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                this.userId = this.authService.getUserId();
            });
    }

    viewProfile() {
        this.router.navigate(['/profile/' + this.userId]);
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy() {}
}

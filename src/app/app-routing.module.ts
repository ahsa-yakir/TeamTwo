import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard';
import { ProfileCreateComponent } from './profiles/create-profile/create-profile.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

const routes: Routes = [
    { path: '', component: PostListComponent },
    {
        path: 'create',
        component: PostCreateComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'create-profile',
        component: ProfileCreateComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'edit/:postId',
        component: PostCreateComponent,
        canActivate: [AuthGuard],
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile/:userId', component: ProfilePageComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule {}

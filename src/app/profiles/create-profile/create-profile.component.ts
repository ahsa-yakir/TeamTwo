import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../posts/post-create/mime-type.validator';

import { Profile } from '../profiles.model';
import { ProfilesService } from '../profiles.service';

@Component({
    selector: 'app-profile-create',
    templateUrl: './create-profile.component.html',
    styleUrls: ['./create-profile.component.css'],
})
export class ProfileCreateComponent implements OnInit {
    enteredTitle = '';
    enteredContent = '';
    profile: Profile;
    imagePreview: string;
    private mode = 'create';
    private postId: string;
    createProfileForm: FormGroup;
    constructor(
        public profilesService: ProfilesService,
        public route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.createProfileForm = new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            highSchool: new FormControl(),
            state: new FormControl(),
            city: new FormControl(),
            country: new FormControl(),
        });
    }

    onImagePicked(event: Event) {}

    onSubmitProfile() {
        if (this.createProfileForm.invalid) {
            return;
        }
        // if (this.mode === 'create') {
        //     this.postsService.addPost(
        //         this.form.value.title,
        //         this.form.value.content,
        //         this.form.value.image
        //     );
        // } else {
        //     // @ts-ignore
        //     this.postsService.updatePost(
        //         this.postId,
        //         this.form.value.title,
        //         this.form.value.content,
        //         this.form.value.image
        //     );
        // }
        // this.form.reset();
    }
}

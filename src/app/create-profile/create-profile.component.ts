import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../posts/post-create/mime-type.validator';

import { createProfile } from './create-profile.model';

@Component({
    selector: 'app-profile-create',
    templateUrl: './create-profile.component.html',
    styleUrls: ['./post-create.component.css'],
})
export class ProfileCreateComponent implements OnInit {
    enteredTitle = '';
    enteredContent = '';
    post: Post;
    form: FormGroup;
    imagePreview: string;
    private mode = 'create';
    private postId: string;
    constructor(
        public postsService: PostsService,
        public route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)],
            }),
            content: new FormControl(null, {
                validators: [Validators.required],
            }),
            image: new FormControl(null, {
                validators: [Validators.required],
                asyncValidators: [mimeType],
            }),
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.postsService.getPost(this.postId).subscribe(postData => {
                    this.post = {
                        id: postData.id,
                        title: postData.title,
                        content: postData.content,
                        imagePath: postData.imagePath,
                        user_id: postData.user_id,
                    };
                    this.form.setValue({
                        title: this.post.title,
                        content: this.post.content,
                        image: this.post.imagePath,
                    });
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    onSavePost() {
        if (this.form.invalid) {
            return;
        }
        if (this.mode === 'create') {
            this.postsService.addPost(
                this.form.value.title,
                this.form.value.content,
                this.form.value.image
            );
        } else {
            // @ts-ignore
            this.postsService.updatePost(
                this.postId,
                this.form.value.title,
                this.form.value.content,
                this.form.value.image
            );
        }
        this.form.reset();
    }
}

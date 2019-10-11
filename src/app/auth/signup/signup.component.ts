import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;

  onSignup(form: NgForm) {
    console.log(form.value);
  }

  constructor() { }

  ngOnInit() {
  }

}

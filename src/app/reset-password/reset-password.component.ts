import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, JwtService } from '../shared';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: '../reset-password/reset-password.component.html',
  styleUrls: ['../reset-password/reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // use FormBuilder to create a form group
    this.resetForm = this.fb.group({
      'email': ['', Validators.required],
    });
  }


  submitForm() {

    const userData = this.resetForm.value.email;

    let userInformation;

    if(this.validateEmail(userData)) {

      userInformation = {
        username: null,
        email: userData
      }

    }else {

      userInformation = {
        username: userData,
        email: null,
      }

    }

    this.userService.passwordReset(userInformation).subscribe(
      passwordResetResponse => {
        console.log(passwordResetResponse);
      }
    )

  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}

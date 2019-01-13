import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, JwtService } from '../../shared';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: '../new-password/new-password.component.html',
  styleUrls: ['../new-password/new-password.component.css']
})

export class NewPasswordComponent implements OnInit {

  newPasswordForm: FormGroup;
  private resetCode;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {

    this.newPasswordForm = this.fb.group({
      'newPassword': ['', Validators.required],
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.resetCode = params['passwordString'];
    });
  }


  submitForm() {

    const newPassword = this.newPasswordForm.value.newPassword;

    const newPasswordInformation = {
      resetCode: this.resetCode,
      newPassword: newPassword
    }

    this.userService.newPassword(newPasswordInformation).subscribe(newPasswordResponse => {

      if(newPasswordResponse.code === 200) {
        console.log('code 200');
      } 
      if(newPasswordResponse.code === 204) {
        console.log('This password reset was already used');
      }
      if(newPasswordResponse.code === 400) {
        console.log('Sorry, this link expired');
      }
      
      

    });
    

  }
}

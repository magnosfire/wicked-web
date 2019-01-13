import { Component, EventEmitter, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Errors } from '../shared';
import { EmailService } from '../shared/services';
import { AuthService } from '../shared/services/auth.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild("content") private engineModal: TemplateRef<any>;
  dialog: NgbModalRef | null;

  authType: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  passwordErrorCounter: number = 0;
  userIP;

  error: string;
  closeResult: string;

  isLogged = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private emailService: EmailService,
    private http: HttpClient,
    private modalService: NgbModal
  ) {

    

    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

    this.http.get('http://api.ipify.org/?format=json').subscribe(data => {
      this.userIP=data['ip'];
    });

  }

  ngOnInit() {

    this.isLogged = this.authService.isLogged;

  }

  submitForm() {

    this.isSubmitting = true;
    this.errors = {errors: {}};

    let userData = {};
    let credentials;
            
    //Check if user is doing the login with USERNAME or EMAIL
    // IF   -> EMAIL
    // ELSE -> USERNAME
    if(this.validateEmail(this.authForm.value.username)) {

      credentials = {
        username: null,
        email: this.authForm.value.username,
        password: this.authForm.value.password,
        userIP  : this.userIP || ''
      };

    }else {

      credentials = {
        username: this.authForm.value.username,
        email: null,
        password: this.authForm.value.password,
        userIP  : this.userIP || ''
      };

    }


    this.authService.attemptAuth(credentials).subscribe(
      data => {
        
        if(data.code === 200) {

          this.isLogged.emit(true);

          if (!data.user.completed) {

            this.router.navigateByUrl('/register/information');

          } else {

            this.router.navigateByUrl('/club');

          }

        } 

        if(data.code === 400) {

          this.error = 'Username/Email or Password invalid';
          this.passwordErrorCounter = this.passwordErrorCounter + 1;
          this.isSubmitting = false;

          if(this.passwordErrorCounter >= 3) {

            this.openModal();

            let userData = {};
            
            if(this.validateEmail(credentials.username)) {

              userData = {
                username: null,
                email: credentials.username
              }

            }else {

              userData = {
                username: credentials.username,
                email: null,
              }

            }


            this.emailService.sendEmailPasswordFails(userData).subscribe(
              data => {
                this.error = "Send email";
                this.passwordErrorCounter = 0;
                console.log(this.userIP);
              }
            );
          }
        } 

        if(data.code === 500) {
          this.error = "Username/Email not found";
          this.isSubmitting = false;
        }


      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  openModal(): void {
    this.dialog = this.modalService.open(this.engineModal);
  }

}

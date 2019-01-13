import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, JwtService } from '../../shared';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})
export class RegisterNewUserComponent implements OnInit {


  private step_1: boolean = true;
  private step_2: boolean = false;
  private step_3: boolean = false;

  private authForm: FormGroup;
  private suggestUsernameVar: string = '';
  private emailRegex: string  = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  private usernameRegex = '^[a-zA-Z0-9]{1,50}$';
  private hiddenPartnerBirthdate: string = 'display-hidden';
  private emailCanNotBeUsed: boolean = false;
  private usernameIsNotValid: boolean = false;
  private birthdateIsValid: boolean = true;
  private partnerBirthdateIsValid: boolean = true;
  private termsIsChecked: boolean = true;
  private listBasicGenders = [];
  private listsexOrientation = [];
  private orientation: boolean = false;
  private hasPartner : boolean = false;
  private token;

  private closeResult: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService
  ) {

    this.authForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
      'username': ['', Validators.compose([Validators.required, Validators.pattern(this.usernameRegex)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'gender': ['', Validators.required],
      'sexOrientation': ['', Validators.required],
      'birthdate': ['', Validators.required],
      'partnerBirthdate': [''],
      'terms': ['', Validators.required],
      'genderCouple': ['', Validators.required]
    });

  }

  ngOnInit() {

    this.userService.getBasicGenders().subscribe(basicGenders => {
      this.listBasicGenders = basicGenders.basicGenders;
    });

    this.onChanges();

  }

  onChanges(): void {
    
    this.authForm.get('gender').valueChanges.subscribe(genderValue => {

      if(this.authForm.get('gender').value <= 5) {

        this.userService.getSexOrientation(this.authForm.get('gender').value).subscribe(sexOrientation => {


          this.orientation = true;
          this.listsexOrientation = sexOrientation.sexOrientation;

        });
      }
      //Check if the user is a couple or single
      if (genderValue === '3' || genderValue === '4' || genderValue === '5') {

        this.hiddenPartnerBirthdate = 'display-block';
        this.hasPartner = true;

      } else {

        this.hiddenPartnerBirthdate = 'display-hidden';

      }
    });
    this.authForm.get('terms').valueChanges.subscribe(termsChecked => {
      if (termsChecked === true) {
        this.termsIsChecked = true;
      } else {
        this.termsIsChecked = false;
      }
    });
  }

  suggestUsername() {

    if (!this.authForm.controls['email'].hasError('pattern')) {

      const suggetion = this.authForm.value.email.substring( 0, this.authForm.value.email.indexOf('@'));
      const email = this.authForm.value.email;

      this.userService.usernameSuggestion(suggetion, email).subscribe(
        data => {
          const emailResult = data.email;
          if (emailResult.emailIsAvailable === true) {
            this.emailCanNotBeUsed = false;
            this.suggestUsernameVar = data.username.suggestion;
          } else {
            this.emailCanNotBeUsed = true;
            this.suggestUsernameVar = data.username.suggestion;
          }
        },
        err => {

        }
      );

    }
  }

  checkUsernameAvailability() {

    if ( this.authForm.controls['username'].valid ) {
      const username  = this.authForm.value.username;

      this.userService.checkUsernameAvailability(username).subscribe(
        data => {

          if (data.isValid === true) {
            this.usernameIsNotValid = false;
          } else {
            this.usernameIsNotValid = true;
          }

        }, err => {

        }
      );

    } else {
      this.usernameIsNotValid = false;
    }

  }

  moveToStep_2(){
    this.step_1 = false;
    this.step_2 = true;
  }

  submitForm() {
    
    const userInformation = this.authForm.value;
    const birthdate = (document.getElementById('birthdate') as HTMLInputElement).value;
    const partnerBirthdate = (document.getElementById('partnerBirthdate') as HTMLInputElement).value;

    if ( userInformation.terms === true ) {

      console.log('AQUI');

      if (this.checkAge(birthdate)) {

        userInformation.birthdate = birthdate;

        if (userInformation.gender === 'Couple'           ||
            userInformation.gender === 'Couple (2 mens)'  ||
            userInformation.gender === 'Couple (2 womans)') {

          if (this.checkAge(partnerBirthdate)) {

            userInformation.partnerBirthdate = partnerBirthdate;
            this.partnerBirthdateIsValid = true;

          } else {

            this.partnerBirthdateIsValid = false;

          }

        } else {

          this.birthdateIsValid = true;

        }

      } else {

        this.birthdateIsValid = false;

      }

      if (this.birthdateIsValid === true && this.partnerBirthdateIsValid === true) {

        this.userService.registerUser(userInformation).subscribe(
          data => {

            const userInfo = {
              token: data.token,
              user: data.user
            };

            this.authService.setAuth(userInfo);
            this.router.navigateByUrl('/register/information');

          },
          err => {

          }
        );


      }
    } else {
      this.termsIsChecked = false;
    }
  }

  checkAge(birthdate) {

    const birthdateToCheck = new Date(birthdate);

    // Because of leap year sum plus 5
    birthdateToCheck.setDate( birthdateToCheck.getDate() + 5 );

    const timeDiff = Math.abs(Date.now() - (birthdateToCheck.getDate()  ) );

    if (Math.floor((timeDiff / (1000 * 3600 * 24)) / 365) >= 18) {

      return true;

    } else {

      return false;

    }
  }




}

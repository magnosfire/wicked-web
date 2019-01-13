import { Component, OnInit, OnChanges  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService, UserService} from '../shared/services';
import { AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit  {

  authForm: FormGroup;
  suggestUsernameVar: String = '';
  emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
  usernameRegex = '^[a-zA-Z0-9]{1,50}$';
  hiddenPartnerBirthdate: String = 'display-hidden';
  emailCanNotBeUsed: boolean = false;
  usernameIsNotValid: boolean = false;
  birthdateIsValid: boolean = true;
  partnerBirthdateIsValid: boolean = true;
  termsIsChecked: boolean = true;
  listBasicGenders;
  listsexOrientation;
  token;

  closeResult: string;

  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,

  ) {

    // use FormBuilder to create a form group
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

    //get token from session
    this.token = this.jwtService.getToken();

    if(this.token) {
      this.authService.checkIfTokenIsValid(this.token).subscribe(tokenValidation => {
        if (tokenValidation) {
          this.router.navigateByUrl('/club');
        } else {
          this.router.navigateByUrl('/');
        };
  
      });
    } else {
      this.router.navigateByUrl('/');
    }

    this.userService.getBasicGenders().subscribe(basicGenders => {
      this.listBasicGenders = basicGenders.basicGenders;
    });

    this.onChanges();
  }

  
  onChanges(): void {
    
    this.authForm.get('gender').valueChanges.subscribe(genderValue => {

      if(this.authForm.get('gender').value <= 5) {

        this.userService.getSexOrientation(this.authForm.get('gender').value).subscribe(sexOrientation => {

          this.listsexOrientation = sexOrientation.sexOrientation;

        });
      }
      //If is a c
      if (genderValue === '3' || genderValue === '4' || genderValue === '5') {

        this.hiddenPartnerBirthdate = 'display-block';

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


  submitForm() {
    
    const userInformation = this.authForm.value;
    const birthdate = (document.getElementById('birthdate') as HTMLInputElement).value;
    const partnerBirthdate = (document.getElementById('partnerBirthdate') as HTMLInputElement).value;

    if ( userInformation.terms === true ) {

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

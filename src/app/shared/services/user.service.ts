import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map } from 'rxjs/operators/map';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';



@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  public isLogged = false;

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  usernameSuggestion(suggestion, email): Observable<any> {
    return this.apiService.get('/user/usernamesuggestion/' + suggestion + '&' + email)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  checkUsernameAvailability(username): Observable<any> {
    return this.apiService.get('/user/checkUsernameAvailability/' + username)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  registerUser(userInformation): Observable<any> {
    return this.apiService.post('/user/signup', userInformation)
      .pipe(map(
        data => {
          console.log(data);
          return data;
        }
      ));
  }

  registerStepTwo(userInformation): Observable<any> {

    return this.apiService.post('/user/signup/step-two', userInformation)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  getBasicGenders() {
    return this.apiService.get('/user/getBasicGenders').pipe(map(
      (responseBasicGenders) => {
          return responseBasicGenders;
        }
      ));
  }

  getSexOrientation(sexOrientation) {
    return this.apiService.get('/user/getSexOrientation/'+ sexOrientation).pipe(map(
      (responseSexOrientation) => {
          return responseSexOrientation;
        }
      ));
  }

  getGendersAndSexOrientation() {
    //return a JSON with gendersAndSexOrientation and code
    return this.apiService.get('/user/getGendersAndSexOrientation/').pipe(map(
      (responseGenders) => {
          return responseGenders.gendersAndSexOrientation;
        }
      ));
  }

  sendEmailPasswordFails () {
    return this.apiService.post('/email/passwordfail').pipe(map(
      (data) => {
        return data;
      }
    ));
  }

  passwordReset(userInformation) {
    return this.apiService.post('/user/passwordreset', userInformation).pipe(map(
      (data) => {
        return data;
      }
    ));
  }

  newPassword(newPasswordInformation) {
    
    return this.apiService.post('/user/newpassword', newPasswordInformation).pipe(map(
      (data) => {
        return data;
      }
    ));
  }

  getPrivacy(token) {
    return this.apiService.get('/user/privacy/'+ token).pipe(map(
      (privacyResponse) => {
          return privacyResponse;
        }
      ));
  }

  updatePrivacy(privacyUpdateInformation) {
    
    return this.apiService.post('/user/privacy', privacyUpdateInformation).pipe(map(
      (data) => {
        return data;
      }
    ));
  }

  changePassword(newPassowrdInformation) {
    
    return this.apiService.post('/user/changePassword', newPassowrdInformation).pipe(map(
      (newPassword) => {
        return newPassword;
      }
    ));
  }

  getPremiumInformation(token) {

    return this.apiService.get('/user/getPremiumInformation/'+ token).pipe(map(
      (responsePremiumInformation) => {
          return responsePremiumInformation;
        }
    ));

  }

  newPremium(userInformation) {
    
    return this.apiService.post('/user/newPremium', userInformation).pipe(map(
      (premiumResponse) => {
        return premiumResponse;
      }
    ));
  }

  autoRebill(rebillInformation) {
    return this.apiService.post('/user/rebillPremium', rebillInformation).pipe(map(
      (rebillResponse) => {
        return rebillResponse;
      }
    ));
  }

  updateProfile(profileUpdateInformation) {
    return this.apiService.post('/user/profileUpdate', profileUpdateInformation).pipe(map(
      (profileUpdateResponse) => {
        return profileUpdateResponse;
      }
    ));
  }

  getGendersInterest(token) {
    return this.apiService.get('/user/getGendersInterest/'+ token).pipe(map(
      (responseGenderInterest) => {
          return responseGenderInterest;
        }
    ));

  }
  

}



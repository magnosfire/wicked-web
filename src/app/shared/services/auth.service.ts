import {EventEmitter, Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {ApiService} from './api.service';
import {JwtService} from './jwt.service';
import {User} from '../models';

@Injectable()
export class AuthService {

  isLogged = new EventEmitter<boolean>();

  constructor(private router: Router,
              private apiService: ApiService,
              private jwtService: JwtService) {

  }

  attemptAuth(userInformation): Observable<any> {
    return this.apiService.post('/user/login', userInformation)
      .pipe(map(
        responseLogin => {
          let data;

          console.log(responseLogin);

          
          if(responseLogin.code === 200) {

            data = {
              token: responseLogin.token,
              user: responseLogin.user,
              code: 200
            };
  
            this.setAuth(data);
        
          } else {

            data = {
              code: responseLogin.code
            };

          }

          return(data);
          
        }
      ));
  }

  logout () {
    this.jwtService.destroyToken();
    this.isLogged.emit(false);
  }

  setAuth(user) {
    this.jwtService.saveToken(JSON.stringify(user));
  }

  checkIfHasToken (userSessionInformation) {
    
  
    if(userSessionInformation) {
      this.checkIfTokenIsValid(userSessionInformation).subscribe(tokenValidation => {
        console.log(' checkIfHasToken' + tokenValidation);
        
        if (tokenValidation) {
          console.log(tokenValidation);
          this.isLogged.emit(true);
          this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
              const currentURL = e.url;
              if ( currentURL === '/' ) {

                console.log(' currentURL  /');

              } else {

                console.log(' currentURL  other');


              }
            }
          });
        } else {
          console.log('ELSE');
          this.isLogged.emit(false);
          this.router.navigateByUrl('/');
        };

      });
    } else {
      this.isLogged.emit(false);
          this.router.navigateByUrl('/');
    }
  }

  checkIfTokenIsValid (token) {

    const tokenInformation = {
      token: JSON.parse(token)
    };

    return this.apiService.post('/user/tokenvalidation', tokenInformation)
    .pipe(map(
      responseToken => {
        
        return responseToken.validation;
        
      }
    ));
  }

}

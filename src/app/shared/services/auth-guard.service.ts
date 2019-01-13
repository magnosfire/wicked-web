import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';
import { take } from 'rxjs/operators/take';
import {JwtService} from './jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {



  constructor(
    private router: Router,
    private userService: UserService,
    private jwtService: JwtService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let userInformation;
    userInformation = this.jwtService.getToken();
    if (userInformation) {
      return true;

    } else {
      this.router.navigateByUrl('/');
      return true;
    }


  }
}

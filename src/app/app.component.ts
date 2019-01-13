import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { UserService } from './shared';
import {JwtService} from './shared/services/jwt.service';
import 'rxjs/add/operator/takeWhile';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private isLogged;
  private token;
  public modalVisible: boolean;
  private hasPartner: boolean = false;
  private orientation: boolean = false;
  private login: boolean = false;


  constructor (
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private jwtService: JwtService,
    private authService: AuthService

  ) {

    this.authService.isLogged.subscribe(
      responseIsLogged => {
        this.isLogged = responseIsLogged;
      }
    );
    this.token = this.jwtService.getToken();
    this.authService.checkIfHasToken(this.token);

    
  }


  ngOnInit() {

  }

}

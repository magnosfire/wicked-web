import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models';
import { UserService } from '../services';
import {JwtService} from '../services/jwt.service';

import 'rxjs/add/operator/takeWhile';
import {AppComponent} from '../../app.component';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-home-layout-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private jwtService: JwtService,
    private authService: AuthService
  ) {

    

  }

  currentUser: User;

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}

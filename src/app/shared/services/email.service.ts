import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators/map';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';


@Injectable()
export class EmailService {

  constructor (
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  sendEmailPasswordFails (userData) {
    return this.apiService.post('/email/passwordfail', userData).pipe(map(
      (data) => {
        return data;
      }
    ))
  }
}

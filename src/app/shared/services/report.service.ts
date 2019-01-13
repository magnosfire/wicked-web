import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { Post } from '../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';


@Injectable()
export class ReportService {

  constructor (
    private apiService: ApiService
  ) {}

  getReport(): Observable<any> {

    return this.apiService.get('/report/')
      .pipe(map(
        reportListList => {
          return reportListList;
        }
      ));
  }

  reportPost(reportInformation): Observable<any> {
    return this.apiService.post('/report/reportPost', reportInformation)
      .pipe(map(
        reportResult => {
          return reportResult;
        }
      ));
  }

  reportComment(reportInformation): Observable<any> {
    return this.apiService.post('/report/reportComment', reportInformation)
      .pipe(map(
        reportResult => {
          return reportResult;
        }
      ));
  }

  reportUser(reportInformation): Observable<any> {
    return this.apiService.post('/report/reportUser', reportInformation)
      .pipe(map(
        reportResult => {
          return reportResult;
        }
      ));
  }

}


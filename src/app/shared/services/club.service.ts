import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Club } from '../models';
import { ClubView } from '../models';
import { map } from 'rxjs/operators/map';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ClubService {
  private currentClubSubject = new BehaviorSubject<Club>({} as Club);
  public currentClub = this.currentClubSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private clubView:Subject<ClubView> = new BehaviorSubject<ClubView>({} as ClubView);
  clubView$ = this.clubView.asObservable().pipe(distinctUntilChanged());

  public club_name;
  public clubInformations;

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  newClub(clubInformation): Observable<any> {
    return this.apiService.post('/club', clubInformation)
      .pipe(map(
        clubResult => {
          return clubResult;
        }
      ));
  }

  getClubs(userInformation): Observable<any> {
    return this.apiService.get('/club/' + userInformation).pipe(map(
      clubList => {
        return clubList;
      }
    ))
  }

  getMembers(clubName): Observable<any> {

    return this.apiService.get('/club/members/' + clubName).pipe(map(
      memberList => {
        return memberList;
      }
    ))
  }

  checkClub(userInformation): Observable<any> {

    return this.apiService.post('/club/checkclub', userInformation)
      .pipe(map(
        clubResult => {

          this.clubView.next(clubResult.clubInformation);
          return clubResult;
        }
      ));  
  }

  joinClub(joinInformation): Observable<any> {

    return this.apiService.post('/club/joinClub', joinInformation)
      .pipe(map(
        joinResult => {

          return joinResult;

        }
      ));  
  }

  leaveClub(leaveInformation): Observable<any> {

    return this.apiService.post('/club/leaveClub', leaveInformation)
      .pipe(map(
        leaveResult => {

          return leaveResult;

        }
      ));  
  }


  applyToClub(applicationInformation): Observable<any> {
    return this.apiService.post('club/applytoclub', applicationInformation).pipe(map(
      applicationResponse => {
        return applicationResponse;
      }
    ))
  }

  getApplications(applicationInformation): Observable<any> {
    return this.apiService.post('club/getapplications', applicationInformation).pipe(map(
      applicationResponse => {
        return applicationResponse;
      }
    ))
  }

  acceptRequest(requestInformation): Observable<any> {
    return this.apiService.post('club/acceptRequest', requestInformation).pipe(map(
      applicationResponse => {
        return applicationResponse;
      }
    ))
  }

  declineRequest(requestInformation): Observable<any> {
    return this.apiService.post('club/declineRequest', requestInformation).pipe(map(
      applicationResponse => {
        return applicationResponse;
      }
    ))
  }

  getMemberList(clubInformation): Observable<any> {
    return this.apiService.post('club/getMemberList', clubInformation).pipe(map(
      applicationResponse => {
        return applicationResponse;
      }
    ))
  }


  chekcUsername(checkInformation): Observable<any> {
    return this.apiService.post('club/chekcUsername', checkInformation).pipe(map(
      checkResponse => {
        return checkResponse;
      }
    ))
  }

  changeClubOwner(changeOwnerInformation): Observable<any> {
    return this.apiService.post('club/changeClubOwner', changeOwnerInformation).pipe(map(
      changeOwnerResponse => {
        return changeOwnerResponse;
      }
    ))
  }


  kickMember(kickInformations): Observable<any> {
    return this.apiService.post('club/kickMember', kickInformations).pipe(map(
      changeOwnerResponse => {
        return changeOwnerResponse;
      }
    ))
  }

  getUserClubs(userInformation): Observable<any> {
    return this.apiService.post('club/getUserClubs', userInformation).pipe(map(
      userClubsResponse => {
        return userClubsResponse;
      }
    ))
  }


}

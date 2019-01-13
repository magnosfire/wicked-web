import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Profile } from '../models';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ProfileService {


  private profileInformations = new BehaviorSubject<any>({});
  profileInformationValue$ = this.profileInformations.asObservable();

  constructor (
    private apiService: ApiService
  ) {}

  getProfileInformation(profileInformation): Observable<any> {
    return this.apiService.post('/user/profile/getProfileInformation', profileInformation).pipe(map(
      profileResponse => {
        this.profileInformations.next(profileResponse.profileInformation);
        return profileResponse;
      }
    ));
  }

}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators/map';


@Injectable()
export class LocationService {

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
  ) {}

  getCountriesList(): Observable<any> {
    return this.apiService.get('/country')
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  getProvincesList(countryID): Observable<any> {
    return this.apiService.get('/province/' + countryID)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  getCitiesList(provinceID): Observable<any> {
    return this.apiService.get('/city/' + provinceID)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  getLocationInformation(cityID): Observable<any> {
    return this.apiService.get('/city/getLocationInformation/' + cityID)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }


}

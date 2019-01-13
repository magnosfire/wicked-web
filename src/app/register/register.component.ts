import { Component, OnInit } from '@angular/core';
import {LocationService} from '../shared/services';

// import { Club } from '../shared/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  constructor(
    private locationService: LocationService
  ) {

    this.locationService.getCountriesList().subscribe(
      data => {

      }, err => {

      });

  }

  // currentClub: Club;

  ngOnInit() {
    /*this.clubService.currentClub.subscribe(
      (clubData) => {
        this.currentClub = clubData;
      }
    );*/
  }
}

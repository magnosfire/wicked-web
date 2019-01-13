import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../shared/services';

import {ClubService} from '../../shared/services/club.service';

@Component({
  selector: 'app-application-club',
  templateUrl: './application-club.component.html',
  styleUrls: ['./application-club.component.css']
})

export class ApplicationClubComponent implements OnInit {

  @Input() clubID
  applicationClubForm: FormGroup;
  messageSuccess = false;
  private token;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private jwtService: JwtService,
    private clubService: ClubService
  ) {

    this.token = JSON.parse(this.jwtService.getToken());

    // use FormBuilder to create a form group
    this.applicationClubForm = this.fb.group({
        'reason': ['', Validators.required]
    });

  }

  ngOnInit() {

  }

  submitForm() {

    console.log(this.clubID);

    const applicationInformation = {
      reason: this.applicationClubForm.value.reason,
      token: this.token.token,
      club_id: this.clubID
    };

    this.clubService.applyToClub(applicationInformation).subscribe( applicationResponse=> {

      if(applicationResponse.code === 200) {
        this.messageSuccess = true;
      }

    });

  }

  modalClose() {
    this.router.navigateByUrl('/club');
  }
  
}

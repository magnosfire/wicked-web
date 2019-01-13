import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../shared/services/club.service';
import { JwtService } from '../../shared';
// import { Subscription } from 'rxjs/Rx';

// import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-new-members-club',
  templateUrl: './new-members-club.component.html',
  styleUrls: ['./new-members-club.component.css']
})
export class NewMembersClubComponent implements OnInit {

  photos: boolean = true;
  applicationList;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clubService: ClubService,
    private jwtService: JwtService
  ) {
  }

  ngOnInit() {

    console.log('Foo');

    console.log(this.clubService.club_name);
    console.log('Foo');

    const applicationInformation = {
      club_name: this.clubService.club_name
    }


    this.clubService.getApplications(applicationInformation).subscribe(applicationsResponse => {

      

      this.applicationList = applicationsResponse.applicationList;

      console.log(this.applicationList);

    });

  }


  acceptRequest(application_id, element_id, user_id) {
    console.log('acceptRequest ' + application_id + ' ELEMENT ID : ' + element_id);

    const token = JSON.parse(this.jwtService.getToken());

    const requestInformation = {
      application_id : application_id,
      club_id : this.clubService.clubInformations.id,
      user_id: user_id
    }
    
    this.clubService.acceptRequest(requestInformation).subscribe( requestResponse => {

      this.applicationList.splice(element_id, 1);

    })
    

  }

  declineRequest(application_id, element_id) {
    console.log('declineRequest');

    const requestInformation = {
      application_id : application_id
    }

    this.clubService.declineRequest(requestInformation).subscribe( requestResponse => {

      this.applicationList.splice(element_id, 1);

    })
  }

}

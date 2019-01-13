import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../shared';
import { ClubService } from '../../shared/services/club.service';


@Component({
  selector: 'app-profile-clubs',
  templateUrl: './profile-clubs.component.html',
  styleUrls: ['./profile-clubs.component.css']
})
export class ProfileClubsComponent implements OnInit {

  photos: boolean = true;

  private profileInformationValue;
  private userClubsList;
  private privacyMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private clubService : ClubService
  ) {

    
  }

  ngOnInit() {

    this.profileService.profileInformationValue$.subscribe(profileInformations=> {

      


      this.profileInformationValue = profileInformations;
      
      

      if(this.profileInformationValue.show_clubs === 1 || this.profileInformationValue.own_profile) {
        
        const userInformation = {
          user_id: this.profileInformationValue.id
        };
  
        this.clubService.getUserClubs(userInformation).subscribe(userClubsListResponse=> {
            this.userClubsList = userClubsListResponse.userClubList;
        });

      } else {
        
        this.privacyMessage = "This user don't show the clubs that has joined";
      
      }

      

    });


  }

}

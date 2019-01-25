import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { ClubService } from '../../shared/services/club.service';
// import { Subscription } from 'rxjs/Rx';

// import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-members-clubs',
  templateUrl: './members-clubs.component.html',
  styleUrls: ['./members-clubs.component.css']
})
export class MembersClubsComponent implements OnInit {

  photos: boolean = true;
  private clubName;
  private memberList;
  private modList;
  private admList;
  private url;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clubService: ClubService 
  ) {

    this.clubName = this.clubService.club_name;

  }

  ngOnInit() {

    this.clubService.getMembers(this.clubName).subscribe(
      membersList=> {

        console.log(membersList);

          this.memberList = membersList.memberList;
          this.modList = membersList.modList;
          this.admList = membersList.admList;

      }
    )

  }

  kickMember(user_id, element_id, listType) {

    const kickInformations = {
      user_id: user_id,
      club_id: this.clubService.clubInformations.id
    }


    this.clubService.kickMember(kickInformations).subscribe(kickResponse => {

      if(kickResponse.code === 200) {

        if(listType === 'mod') {

          this.modList.splice(element_id, 1);
          
        };

        if(listType === 'member'){

          this.memberList.splice(element_id, 1);

        }

      }

    });

  }

}

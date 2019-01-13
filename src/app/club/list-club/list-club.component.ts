import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ClubService} from '../../shared/services/club.service';
import { JwtService} from '../../shared/services';

@Component({
  selector: 'app-list-club',
  templateUrl: './list-club.component.html',
  styleUrls: ['./list-club.component.css']
})
export class ListClubComponent implements OnInit {

  id: number;

  public joinedClubsList;
  public joinedClubsListData;
  public clubsList;
  public clubsListData;
  clubFilter:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clubService: ClubService,
    private jwtService: JwtService
  ) {

    const token = this.jwtService.getToken();

    this.clubService.getClubs(token).subscribe(clubListResponse => {
      this.joinedClubsList = clubListResponse.joinedClubs;
      this.clubsList = clubListResponse.publicClubs;
      this.clubsListData = this.clubsList;
      return clubListResponse;
    });

  }

  ngOnInit() {
    
  }

  applyClubFilter(filter){

    if(filter === "All") {
      this.sortAll();
    }
    if(filter === "Public") {
      this.sortPublic();
    }
    if(filter === "Private") {
      this.sortPrivate();
    }
    if(filter === "Sort A->Z") {
      this.sortAToZ();
    }
    if(filter === "Sort Z->A") {
      this.sortZToA();
    }
    if(filter === "Members") {
      this.sortTotalMembers();
    }


  }

  sortAToZ() {
    this.clubsList = ( this.clubsList || []).sort((a,b)=> a.club_name < b.club_name? -1 : 1);
  }

  sortZToA() {
    this.clubsList = ( this.clubsList || []).sort((a,b)=> a.club_name > b.club_name? -1 : 1);
  }

  sortTotalMembers() {
    this.clubsList = ( this.clubsList || []).sort((a,b)=> a.total_members > b.total_members? -1 : 1);
  }

  sortAll() {
    this.clubsList = this.clubsListData;
  }

  sortPrivate() {
    this.clubsList = this.clubsListData.filter(x => x.private === 1);
  }

  sortPublic() {
    this.clubsList = this.clubsListData.filter(x => x.private === 0);
  }

}

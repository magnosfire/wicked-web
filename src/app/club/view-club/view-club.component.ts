import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { JwtService } from '../../shared';
import { ClubService } from '../../shared/services/club.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Subscription } from 'rxjs/Rx';

// import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-view-club',
  templateUrl: './view-club.component.html',
  styleUrls: ['./view-club.component.css']
})
export class ViewClubComponent implements OnInit {

  @ViewChild("content") private engineModal: TemplateRef<any>;
  dialog: NgbModalRef | null;
  private closeResult;
  private popUpModal = false;

  public clubName: String = '';
  public member: boolean = false;
  public clubInformations;
  public club_name;
  public userAge;
  public partnerAge;
  public token;
  private club_adm = false;


  applicationClubForm: FormGroup;
  messageSuccess = false;
  has_application = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jwtService : JwtService,
    private clubService: ClubService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router
  ) {

    // use FormBuilder to create a form group
    this.applicationClubForm = this.fb.group({
      'reason': ['', Validators.required]
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      this.clubName = params['clubName'];
      this.clubService.club_name = this.clubName;
    });

    this.token = JSON.parse(this.jwtService.getToken());
    this.userAge = this.checkAge(this.token.user.birthdate);

    if(this.token.user.partner_birthdate) {

      this.partnerAge = this.checkAge(this.token.user.partner_birthdate);

    } else {

      this.partnerAge = null;

    }
    
    const userInformation  = {
      token: this.token.token,
      birthdate :  this.token.user.birthdate,
      city_id:  this.token.user.city_id,
      completed:  this.token.user.completed,
      email_confirmed:  this.token.user.email_confirmed,
      gender_id:  this.token.user.gender_id,
      partner_birthdate:  this.token.user.partner_birthdate,
      club_name: this.clubName
    }

    this.clubService.checkClub(userInformation).subscribe( clubResponse =>{

      if(clubResponse.code === 404) {

        console.log('400');

        this.router.navigateByUrl('/club');

      } else {

        this.clubInformations = clubResponse.clubInformation;

        console.log(this.clubInformations);

        this.clubService.clubInformations = clubResponse.clubInformation;
        this.club_name = this.clubInformations.club_name;

        if(this.clubInformations.club_adm === 1) {
          this.club_adm = true;
        }

        // check if the user is a club member
        if(this.clubInformations.is_member === 1) {

          console.log('MEMBER');

          this.member = true;

        } else{

          this.member = false;
          this.has_application = this.clubInformations.has_application;

          console.log('NOT MEMBER');

          if(this.partnerAge != null) {

            console.log('PARTNER AGE NOT NULL');

            if(this.clubInformations.gender_allowed === 1 && 
              this.token.user.city_id  === this.clubInformations.city_id &&
              this.userAge <= this.clubInformations.max_age && this.userAge >= this.clubInformations.min_age &&
              this.partnerAge <= this.clubInformations.max_age && this.partnerAge >= this.clubInformations.min_age ) {
 
             //check if the club is private
             if(this.clubInformations.private === 1) {
 
               this.openModal();
 
             } else {
 
               console.log('IS NOT PRIVATE');
               
             }
 
           } else {
             this.router.navigateByUrl('/club');
           }

          } else {

            console.log('PARTNER AGE NULL');
            console.log(this.clubInformations);
            console.log('PARTNER AGE NULL');

            

            if(this.clubInformations.gender_allowed === 1 && 
              this.token.user.city_id  === this.clubInformations.city_id &&
              this.userAge <= this.clubInformations.max_age && this.userAge >= this.clubInformations.min_age ) {
 
             //check if the club is private
             if(this.clubInformations.private === 1) {

              console.log('IS PRIVATE');
 
               this.openModal();
 
             } else {
 
               console.log('IS NOT PRIVATE');
               
             }
 
           } else {

            console.log('ELSE');

             this.router.navigateByUrl('/club');
           }

          }

          

        }
      }
      

    });

  }

  ngOnInit() {


  }

  joinClub() {


    const joinInformation = {

      club_id : this.clubService.clubInformations.id,
      token : this.token.token

    }



    this.clubService.joinClub(joinInformation).subscribe( joinResponse => {

      this.clubInformations.is_member = 1;
      this.clubInformations.total_members = this.clubInformations.total_members + 1;
      this.member = true;

    });

  }

  leaveClub() {

    if( this.clubInformations.club_adm === 1 ) {

        console.log('You can not leave the group because you are the club adm');

    } else {

      const leaveInformation = {
      
        club_id : this.clubService.clubInformations.id,
        token : this.token.token
  
      }

      this.clubService.leaveClub(leaveInformation).subscribe( leaveResponse => {
        this.router.navigateByUrl('/club');
      });

    }

  }

  openModal() {

    this.modalService.open(this.engineModal).result.then((result) => {

      
      this.closeResult = `Closed with: ${result}`;

      if(result) {
        this.router.navigateByUrl('/club');
      }
      
    }, (reason) => {
      this.router.navigateByUrl('/club');

    });

  }

  submitForm() {


    const applicationInformation = {
      reason: this.applicationClubForm.value.reason,
      token: this.token.token,
      club_id: this.clubInformations.id
    };

    this.clubService.applyToClub(applicationInformation).subscribe( applicationResponse=> {

      if(applicationResponse.code === 200) {
        this.messageSuccess = true;
      }

    });

  }

  checkAge(birthdate) {

    const birthdateToCheck = new Date(birthdate);

    // Because of leap year sum plus 5
    birthdateToCheck.setDate( birthdateToCheck.getDate() + 5 );

    const timeDiff = Math.abs(Date.now() - (birthdateToCheck.getTime()) );
    const convertedAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);

    return convertedAge;

  }

}

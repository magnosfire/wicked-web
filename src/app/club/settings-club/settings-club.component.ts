import { Component, OnInit, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClubService } from '../../shared/services/club.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JwtService } from '../../shared';

@Component({
  selector: 'app-settings-club',
  templateUrl: './settings-club.component.html',
  styleUrls: ['./settings-club.component.css']
})
export class SettingsClubComponent implements OnInit {

  photos: boolean = true;

  transferClubForm: FormGroup;

  
  @ViewChild("content") private engineModal: TemplateRef<any>;
  @ViewChild("contentTransfer") private engineTransferModal: TemplateRef<any>;



  dialog: NgbModalRef | null;
  private closeResult;
  private popUpModal = false;


  public query = '';
  private memberList;
  public filteredList = [];
  public elementRef;

  private new_owner_id;

  private token;

  private username_valid = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, 
    private myElement: ElementRef,
    private clubService: ClubService,
    private modalService: NgbModal,
    private jwtService: JwtService
  ) {

    this.token = JSON.parse(this.jwtService.getToken());

    this.elementRef = myElement;

    // use FormBuilder to create a form group
    this.transferClubForm = this.fb.group({
      'username': ['', Validators.required]
    });  

  }

  ngOnInit() {

    const clubInformation = {
      club_name: this.clubService.club_name
    }

    this.clubService.getMemberList(clubInformation).subscribe(memberList => {

      this.memberList = memberList.memberList;

    })

  }

  checkUsername() {
    
    const checkInformation = {
      username : this.query,
      club_id: this.clubService.clubInformations.id
    };

    this.clubService.chekcUsername(checkInformation).subscribe(checkResponse => {

      if (checkResponse.memberList === 0) {

        this.username_valid = false;

        this.openModal();

      }else {

        this.new_owner_id = checkResponse.memberList.id;

        this.username_valid = true;

        this.openTransferConfirmationModal();

      }

    });

  }

  changeClubOwner() {

    const changeOwnerInformation = {
      new_owner_id : this.new_owner_id,
      club_id: this.clubService.clubInformations.id,
      token: this.token.token
    }

    this.clubService.changeClubOwner(changeOwnerInformation).subscribe(changeOwnerResponse => {
      $("#closeTransferModal").click();

      this.router.navigate(['/club/']);
    });


  }




  /*---------------------------------------------------------*/

  filter() {
    if (this.query !== ""){
        this.filteredList = this.memberList.filter(function(el){
            return el.username.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
  }
  
  select(item){
      this.query = item;
      this.filteredList = [];
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
        if (clickedComponent === this.elementRef.nativeElement) {
            inside = true;
        }
       clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
     if(!inside){
         this.filteredList = [];
     }
  }

  openModal() {

    this.modalService.open(this.engineModal).result.then((result) => {

      
      this.closeResult = `Closed with: ${result}`;

      if(result) {
        
      }
      
    }, (reason) => {


    });

  }

  openTransferConfirmationModal() {

    this.modalService.open(this.engineTransferModal).result.then((result) => {

      
      this.closeResult = `Closed with: ${result}`;

      if(result) {
        
      }
      
    }, (reason) => {


    });

  }

}

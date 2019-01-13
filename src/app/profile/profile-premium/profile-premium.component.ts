import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService, UserService } from '../../shared';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-premium',
  templateUrl: './profile-premium.component.html',
  styleUrls: ['./profile-premium.component.css']
})
export class ProfilePremiumComponent implements OnInit {

  photos: boolean = true;
  private token: any = '';
  private premium: any = '';

  @ViewChild("content") private engineModal: TemplateRef<any>;
  dialog: NgbModalRef | null;
  private closeResult;
  private popUpModal = false;
  private autoRebill: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private jwtService: JwtService,
    private userService: UserService
  ) {

    this.token = JSON.parse(this.jwtService.getToken());

    console.log(this.token.token);

    const userInformation = {
      token: this.token.token
    }

    this.userService.getPremiumInformation(userInformation.token).subscribe(premiumReponse=> {
      console.log(premiumReponse);
      this.premium = premiumReponse.data;
      this.autoRebill = premiumReponse.data.auto_rebill;
    });

  }

  ngOnInit() {

    console.log('Foo');

  }

  bePremium() {

    console.log('BE PREMIUM');

    const userInformation = {
      token: this.token.token
    }

    this.userService.newPremium(userInformation).subscribe( newPremiumResponse => {

      if(newPremiumResponse.code = 200) {
        $("#closeTransferModal").click();
      }

    });

  }

  openModal() {

    this.modalService.open(this.engineModal).result.then((result) => {

      
      this.closeResult = `Closed with: ${result}`;

      if(result) {
        
      }
      
    }, (reason) => {


    });

  }

  updateAutoRebill(e) {
    if(e.target.checked){

      this.autoRebill = true;

    }else {

      this.autoRebill = false;

    }

    const rebillInformation = {
      token: this.token.token,
      rebill: this.autoRebill
    }

    this.userService.autoRebill(rebillInformation).subscribe(rebillResponse => {
      console.log(rebillResponse.code);
      
    });
    
  }

}

import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, JwtService } from '../../shared';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Subscription } from 'rxjs/Rx';

// import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css']
})
export class ProfileAccountComponent implements OnInit {

  newPasswordForm: FormGroup;

  private changingPassword: boolean = false;
  private token: any;
  private privacyList: any = [];
  private matchCurrentPassword: boolean = true;
  private matchNewPassword: boolean = true;

  @ViewChild("content") private engineModal: TemplateRef<any>;
  dialog: NgbModalRef | null;
  private closeResult;
  private popUpModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService,
    private jwtService: JwtService
  ) {

    this.newPasswordForm = this.fb.group({
      'current_password': ['', Validators.required],
      'new_password': ['', Validators.required],
      'confirm_password': ['', Validators.required]
    });

    this.token = JSON.parse(this.jwtService.getToken());

    const privacyInformation = {
      token : this.token.token
    }

    this.userService.getPrivacy(privacyInformation.token).subscribe(privacyResponse => {

      this.privacyList = privacyResponse.privacyList;

    });

  }

  ngOnInit() {
    
  }

  changePassword() {
    this.changingPassword = true;
  }

  cancelChangePassword() {
    this.changingPassword = false;
  }

  submitForm(){

    if(this.newPasswordForm.value.new_password === this.newPasswordForm.value.confirm_password) {

      const newPassowrdInformation = {

        token: this.token.token,
        new_password : this.newPasswordForm.value.new_password,
        current_password: this.newPasswordForm.value.current_password
      
      }

      this.userService.changePassword(newPassowrdInformation).subscribe(newPassowrdReponse => {

        console.log(newPassowrdReponse);

        if(newPassowrdReponse.code === 400) {

          this.matchCurrentPassword = true;

          

        } else {

          this.openModal();

        }

      });

    } else {

      this.matchNewPassword = false;

    }
    
  }

  openModal() {

    this.modalService.open(this.engineModal).result.then((result) => {

      
      this.closeResult = `Closed with: ${result}`;

      if(result) {
        console.log('report');
        this.redirectToLogin();
      }
      
    }, (reason) => {

      this.redirectToLogin();

    });

  }

  redirectToLogin() {

    this.jwtService.destroyToken();
    this.router.navigate(['/']);

  }

}

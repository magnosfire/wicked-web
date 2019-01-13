import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, JwtService } from '../../shared';
// import { Subscription } from 'rxjs/Rx';

// import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-profile-privacy',
  templateUrl: './profile-privacy.component.html',
  styleUrls: ['./profile-privacy.component.css']
})
export class ProfilePrivacyComponent implements OnInit {

  privacyForm: FormGroup;

  private edit: boolean = false;
  private token: any;
  private privacyList: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private jwtService: JwtService
  ) {

    console.log('TWICE');

    this.privacyForm = this.fb.group({
      'show_clubs': [true, Validators.required],
      'show_gallery': [true, Validators.required],
      'show_logged': [true, Validators.required]
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

  editPrivacy() {
    this.edit = true;
  }

  submitForm(){
    

    const privacyUpdateInformation = {
      user_id: this.privacyList.user_id,
      show_clubs : this.privacyForm.value.show_clubs,
      show_gallery: this.privacyForm.value.show_gallery,
      show_logged: this.privacyForm.value.show_logged
    }

    this.userService.updatePrivacy(privacyUpdateInformation).subscribe(privacyUpdateResponse => {

      this.privacyList.show_clubs = this.privacyForm.value.show_clubs;
      this.privacyList.show_gallery = this.privacyForm.value.show_gallery;
      this.privacyList.show_logged = this.privacyForm.value.show_logged;

      this.edit = false;

    });

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { UserService, JwtService, LocationService, ProfileService } from '../../shared';
import { forEach } from '@angular/router/src/utils/collection';
// import { Subscription } from 'rxjs/Rx';

// import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  privacyForm: FormGroup;

  private edit: boolean = false;
  private token: any;
  private privacyList: any = [];
  private enableEditProfile: boolean = false;

  private countryList;
  private provinceList;
  private cityList;

  private profileInformations: any = '';
  private userInterest: any = '';

  private genderInterestList: any = [];
  private genderUserInterestList: any = [];

  private userLocationInformation: any;

  private hideUserProvince = 0;
  private hideUserCity = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private jwtService: JwtService,
    private locationService: LocationService,
    private profileService: ProfileService
  ) {

    this.privacyForm = this.fb.group({
      'edit_bio': [],
      'country': ['', Validators.required],
      'province': [],
      'city': ['', Validators.required],
      'interest': this.fb.array([])
    });

    this.token = JSON.parse(this.jwtService.getToken());

    this.getLocationInformation(this.token.user.city_id);
    
    const profileInformation = {
      token : this.token.token,
      username : ''
    }

    this.profileService.getProfileInformation(profileInformation).subscribe(profileResponse=>{
  
      this.profileInformations = profileResponse.profileInformation;   

      this.privacyForm.controls['edit_bio'].patchValue(this.profileInformations.bio, {onlySelf: true});

    });

    this.userService.getGendersAndSexOrientation().subscribe(genderSexOrientationResponse=>{
  
      this.userInterest = genderSexOrientationResponse;   

    });

  }


  ngOnInit() {

    this.privacyForm.get('country').valueChanges.subscribe(countryID => {
      
      this.getProvinces(countryID);

      if(countryID != this.userLocationInformation.countryID) {

        this.hideUserProvince = 1;
        this.hideUserCity = 1;
        this.privacyForm.controls['province'].patchValue(null);
        this.cityList = [];

      } else {

        this.hideUserProvince = 0;
        this.hideUserCity = 0;
        this.privacyForm.controls['province'].patchValue(this.userLocationInformation.provinceID);
        this.getCities(this.userLocationInformation.provinceID);
        
      }
    });

    this.privacyForm.get('province').valueChanges.subscribe(provinceID => {
      
      this.getCities(provinceID);
      
      if(provinceID != this.userLocationInformation.provinceID) {
 
        this.hideUserCity = 1;
        this.privacyForm.controls['city'].patchValue(null);

      } else {

        this.hideUserCity = 0;
        this.privacyForm.controls['city'].patchValue(this.userLocationInformation.cityID);

      }

    });
    
  }

  editPrivacy() {
    
    this.edit = true;

  }

  submitForm(){

    console.log(this.privacyForm.value.city);

    if(this.privacyForm.value.city === null) {

      console.log('CITY ID IS NULL');

    } else {

      console.log(this.privacyForm.value.interest + '<-------------------------------');

      /*const profileUpdateInformation = {
        token: this.token.token,
        edit_bio: this.privacyForm.value.edit_bio,
        countryID : this.privacyForm.value.country,
        provinceID: this.privacyForm.value.province,
        cityID: this.privacyForm.value.city,
        interest: this.privacyForm.value.interest
      }

      console.log(this.privacyForm.value.interest + '<-------------------------------');
  
      this.userService.updateProfile(profileUpdateInformation).subscribe(profileUpdateResponse => {

        this.privacyForm.controls['interest'].patchValue([]);

        console.log(this.privacyForm.value.interest + '<****************************');

        this.profileInformations = profileUpdateResponse.profileInformation;
        
  
        this.cancelProfile();
  
      });*/

    }

  }

  editProfile() {

    this.enableEditProfile = true;
    
    this.getGendersInterest();

  }

  cancelProfile() {

    this.enableEditProfile = false;

  }

  onChange(email:string, isChecked: boolean) {
    const emailFormArray = <FormArray>this.privacyForm.controls.interest;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(email));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == email)
      emailFormArray.removeAt(index);
    }

  }

  //------------FUNCTIONS -------------------//

  getLocationInformation(cityId) {

    this.locationService.getLocationInformation(cityId).subscribe(
      data => {

        this.userLocationInformation = data.locationInformation;

        //patch values for privacyForm
        this.privacyForm.controls['country'].patchValue(this.userLocationInformation.countryID);
        this.privacyForm.controls['province'].patchValue(this.userLocationInformation.provinceID);
        this.privacyForm.controls['city'].patchValue(this.userLocationInformation.cityID);

        //set data to the select
        this.countryList = data.countryList;
        this.provinceList = data.provinceList;
        this.cityList = data.cityList;

      }, err => {

      });



  }

  getCountries() {

    this.locationService.getCountriesList().subscribe(
      data => {
        this.countryList = data;

      }, err => {

      });

  }

  getProvinces(countryID) {

    if(countryID === null) {

    } else {

      this.locationService.getProvincesList(countryID).subscribe(
        data => {
  
          this.provinceList = data;
          
          return data;
          
        }, err => {
  
        });

    }

  }

  getCities(provinceID) {

    if(provinceID === null){

    }else {

      this.locationService.getCitiesList(provinceID).subscribe(
        data => {
          this.cityList = data;
          return data;
        }, err => {
  
        });

    }

  }

  getGendersInterest() {

    this.genderInterestList = []
    const ts = <FormArray>this.privacyForm.controls.interest;
    ts.controls = [];
    

    console.log(" : FORM");
    console.log(this.privacyForm.value.interest);
    console.log(" : FORM");

    console.log(this.genderInterestList + " : LIST");




    this.userService.getGendersInterest(this.token.token).subscribe(genderInterestResponse => {

      

      this.genderInterestList = genderInterestResponse.gendersInterestList;

      genderInterestResponse.gendersInterestList.forEach(item => {

        console.log(" !!!!!!!!!!!!!");
        console.log(this.privacyForm.value.interest);
        console.log(" !!!!!!!!!!!!!");


        const emailFormArray = <FormArray>this.privacyForm.controls.interest;
  
        if(item.checked) {
          emailFormArray.push(new FormControl(item.id));
        } 

      });

    });

  }

}

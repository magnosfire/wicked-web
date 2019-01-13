import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
//import { ImageCropperComponent } from 'ngx-img-cropper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService, LocationService, UserService } from '../../shared/services';

import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from '../../shared/image-cropper/image-cropper.component';

@Component({
  selector: 'app-register-information',
  templateUrl: './register.information.component.html',
  styleUrls: ['./register.information.component.css']
})
export class RegisterInformationComponent implements OnInit {

  registerForm: FormGroup;
  myForm: FormGroup;

  private dataURI: any = '';
  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private imageChangedEventUpload: File = null;
  private cropperReady = false;

  private countryList;
  private provinceList;
  private cityList;
  private token;
  

  @ViewChild("content") private engineModal: TemplateRef<any>;
  dialog: NgbModalRef | null;
  private closeResult;
  private popUpModal = false;

  selectedFile: File;

  @ViewChild('cropper') cropper: ImageCropperComponent;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private locationService: LocationService,
    private jwtService: JwtService,
    private userService: UserService,
    private modalService: NgbModal
  ) {

    this.getCountries();

    // use FormBuilder to create a form group
    this.registerForm = this.fb.group({
      'image': [''],
      'country': ['', Validators.required],
      'province': ['', Validators.required],
      'city': ['', Validators.required]
    });

    this.token = JSON.parse(this.jwtService.getToken().toString());

    if (this.token.user.completed === 1) {
      this.router.navigateByUrl('/club');
    }

  }

  ngOnInit() {

    this.registerForm.get('country').valueChanges.subscribe(countryID => {
      this.getProvinces(countryID);
    });

    this.registerForm.get('province').valueChanges.subscribe(provinceID => {
      this.getCities(provinceID);
    });

  }

  fileChangeEvent(event: any): void {
    if(event.target.files[0]){

      this.imageChangedEvent = event;
      this.imageChangedEventUpload = <File>event.target.files[0];
      this.fileChangeListener(event);
      
    }
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  imageLoaded() {
    this.cropperReady = true;
  }

  fileChangeListener($event) {

    console.log('TESTEEEE');

    this.openModal();

    /*console.log($event.target.files[0]);

    if($event.target.files[0]) {

      const image: any = new Image();
      const file: File = $event.target.files[0];
      const that = this;
      const myReader: FileReader = new FileReader();

      myReader.onloadend = function (loadEvent: any) {

        image.src = loadEvent.target.result;
        that.dataURI = image.src;

      };
      myReader.readAsDataURL(file);

    }*/

  }

  submitForm() {

    if(!this.croppedImage && !this.popUpModal) {
      
      this.popUpModal = true;
      this.openModal();

    } else {
      
      let token = JSON.parse(this.jwtService.getToken().toString());

      const fd = new FormData;
      fd.append('picture', this.croppedImage || '');
      if(this.croppedImage && this.popUpModal) {
        fd.append('pictureName',this.imageChangedEventUpload.name || '');
      }
      fd.append('country', this.registerForm.value.country);
      fd.append('city', this.registerForm.value.city);
      fd.append('token', token.token);

      this.userService.registerStepTwo(fd).subscribe(
        userUpdateCallback => {

          const updatedToken = this.token;
          updatedToken.user.completed = 1;
          this.jwtService.saveToken(JSON.stringify(updatedToken));

          this.token = this.jwtService.getToken();

          this.router.navigateByUrl('/club');

        }, err => {

      });
      
    }

  }

  //------------FUNCTIONS -------------------//

  getCountries() {

    this.locationService.getCountriesList().subscribe(
      data => {
        this.countryList = data;
      }, err => {

      });

  }

  getProvinces(countryID) {

    this.locationService.getProvincesList(countryID).subscribe(
      data => {
        this.provinceList = data;
        return data;
      }, err => {

      });

  }

  getCities(provinceID) {

    this.locationService.getCitiesList(provinceID).subscribe(
      data => {
        this.cityList = data;
        return data;
      }, err => {

      });

  }


  openModal() {

    this.modalService.open(this.engineModal).result.then((result) => {

      
      this.closeResult = `Closed with: ${result}`;

      if(result) {
        console.log(result);
        this.submitForm();
      }
      
    }, (reason) => {

    });

  }

}

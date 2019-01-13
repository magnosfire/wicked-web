import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ngx-img-cropper';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
// import { saveAs } from 'file-saver';
import {JwtService, LocationService, UserService} from '../../shared/services';
import {map} from 'rxjs/operators/map';
import {ClubService} from '../../shared/services/club.service';

import { NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { NouisliderComponent } from 'ng2-nouislider';


@Component({
  selector: 'app-new-club',
  templateUrl: './new-club.component.html',
  styleUrls: ['./new-club.component.css']
})
export class NewClubComponent implements OnInit {

  newClubForm: FormGroup;

  @ViewChild("content") private engineModal: TemplateRef<any>;
  dialog: NgbModalRef | null;
  private closeResult;
  private popUpModal = false;

  @ViewChild('range') public range: NouisliderComponent;


  private dataURI: any = '';
  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private cropperReady = false;
  private data: any;
  private token;
  gendersVariable;
  noSpaceRegex = '^[^-\][a-zA-Z0-9_-]+$';
  genderlist;
  someRange=[18, 100];

  @ViewChild('cropper') cropper: ImageCropperComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private locationService: LocationService,
    private userService: UserService,
    private jwtService: JwtService,
    private clubService: ClubService,
    private modalService: NgbModal
  ) {

    this.token = JSON.parse(this.jwtService.getToken());

    // use FormBuilder to create a form group
    this.newClubForm = this.fb.group({
      'image': [''],
      'clubname': ['', Validators.compose([Validators.required, Validators.pattern(this.noSpaceRegex)])],
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'visibility': ['', Validators.required],
      'genders': this.fb.array([]),
      'token': this.token
    });

    this.userService.getGendersAndSexOrientation().subscribe( genderResponse => {
      console.log(genderResponse);
      this.genderlist = genderResponse;
    });

  }

  ngOnInit() {

  }

  onChange(email:string, isChecked: boolean) {
    const emailFormArray = <FormArray>this.newClubForm.controls.genders;
  
    if(isChecked) {
      emailFormArray.push(new FormControl(email));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == email)
      emailFormArray.removeAt(index);
    }
  }

  submitForm() {

    console.log(this.newClubForm.value);
    console.log(this.someRange);

    const clubInformation = {
      clubname: this.newClubForm.value.clubname,
      description: this.newClubForm.value.description,
      genders: this.newClubForm.value.genders,
      image: this.newClubForm.value.image,
      token: this.newClubForm.value.token,
      visibility: this.newClubForm.value.visibility,
      minAge: this.someRange[0],
      maxAge: this.someRange[1],

    }

    this.clubService.newClub(clubInformation).subscribe(
      data => {
        console.log(data);
        if (data.code === 400) {
          this.router.navigateByUrl('/club');
        } else 
        {
          this.openModal();
        }
        
      }, err => {

    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.fileChangeListener(event);
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    this.cropperReady = true;

  }



  fileChangeListener($event) {

    const image: any = new Image();
    const file: File = $event.target.files[0];
    const that = this;
    const myReader: FileReader = new FileReader();

    myReader.onloadend = function (loadEvent: any) {

      image.src = loadEvent.target.result;
      that.dataURI = image.src;

    };
    myReader.readAsDataURL(file);

  }

  dataURItoBlob(dataURI) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }

  changeImageToBlob() {

    const base64: string = this.croppedImage;

    const blob = this.dataURItoBlob(base64);
    // saveAs(blob, 'croppedFilezz.png');

    // this.registerForm.setValue(blob);
    this.newClubForm.controls['image'].setValue(base64, 'croppedFilezz.jpg');
    return blob;

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

  someKeyboardConfig: any = {
    behaviour: 'drag',
    connect: [true, true,true],
    tooltips: [true, true],
    start: [20, 40],
    keyboard: true, // same as [keyboard]="true"
    step: 1,
    pageSteps: 10, // number of page steps, defaults to 10
    range: {
    min: 18,
    max: 100
    }
  };



}

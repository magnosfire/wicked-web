import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import {NavigationEnd, Router, NavigationStart, ActivatedRoute, Params} from '@angular/router';
import { ProfileService, JwtService, ReportService } from '../shared';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private username: string = '';
  private profileInformations: any = '';

  @ViewChild("content") private engineModal: TemplateRef<any>;
  @ViewChild("pin") private pinModal: TemplateRef<any>;
  @ViewChild("closeBtn") private closeBtn: ElementRef;
  dialog: NgbModalRef | null;
  private closeResult;
  private popUpModal = false;
  private report = false;
  reportForm: FormGroup;
  public reportList = [];
  reportFinished = false;
  reportIsValid = false;
  private token: any;
  private show_loggin: any = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private reportService: ReportService,
    private jwtService: JwtService
  ) {

    this.reportForm = this.fb.group({
      'report': new FormControl(null),
      'text': ['', Validators.required],
    });


    this.reportFinished = false;

    this.reportForm.controls['report'].setValue('default', {onlySelf: true});

    this.activatedRoute.params.subscribe((params: Params) => {

      this.username = params['username'];

    });

    this.token = JSON.parse(this.jwtService.getToken());

    let profileInformation;


    if(this.username) {

      profileInformation = {
        token : this.token.token,
        username : this.username
      }
  
    } else {

      profileInformation = {
        token : this.token.token,
        username : ''
      }

    }

    this.profileService.getProfileInformation(profileInformation).subscribe(profileResponse=>{
  
      this.profileInformations = profileResponse.profileInformation;

      this.show_loggin = this.profileInformations.show_logged;
      

    });

    

  }

  ngOnInit() {

  }

  public openModal() {

    this.reportFinished = false;
    this.reportIsValid = false;

    this.reportService.getReport().subscribe(reportListResponse => {
      this.reportList = reportListResponse.reportList;
    });

    this.modalService.open(this.engineModal).result.then((result) => {

      
      this.closeResult = `Closed with: ${result}`;

      if(result) {
        console.log('report');
      }
      
    }, (reason) => {
      

    });

  }

  checkReport() {
    
    if(this.reportForm.value.report === 'default') {

      this.reportIsValid = false;

    } else {

      this.reportIsValid = true;
      
    }
  }

  submitReport() {

    const reportInformation = { 
      token: this.token.token,
      report_id:this.reportForm.value.report,
      comment: this.reportForm.value.text,
      reported_user_id: this.profileInformations.id
    }

    console.log(reportInformation);

    this.reportService.reportUser(reportInformation).subscribe(reportResponse => {

      this.reportFinished = true;

    });
    

  }

}

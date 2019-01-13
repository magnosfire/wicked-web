import { Component,EventEmitter, OnInit, HostListener, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { JwtService, PostService, CommentService, ReportService } from '../../shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ListCommentComponent } from '../../comment/list-comment/list-comment.component';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ListPostComponent } from '../list-post/list-post.component';



@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: ['./report-post.component.css']
})
export class ReportPostComponent implements OnInit {

  @Input() reportPostID; 

  token;

  reportForm: FormGroup;

  report: any;

  countryForm: FormGroup;

  public reportList = [];

  @ViewChild("content") private engineModal: TemplateRef<any>;
  dialog: NgbModalRef | null;
  private closeResult;
  private popUpModal = false;

  reportFinished = false;

    
  
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private reportService: ReportService,
    private jwtService: JwtService,
    private listPostComponent: ListPostComponent) {

      this.reportForm = this.fb.group({
        'report': new FormControl(null),
        'text': ['', Validators.required],
      });

    this.reportForm.controls['report'].setValue('default', {onlySelf: true});

    this.token = JSON.parse(this.jwtService.getToken());

    this.reportFinished = false;

  }

  ngOnInit() {


    this.modalService.open(this.engineModal).result.then((result) => {

    
      this.closeResult = `Closed with: ${result}`;

      if(result) {
        console.log('report');
      }
      
    }, (reason) => {
      

    });


    this.reportService.getReport().subscribe(reportListResponse => {
        this.reportList = reportListResponse.reportList;
    });

  }

  submitForm() {

    const reportInformation = { 
      token: this.token.token,
      report_id:this.reportForm.value.report,
      comment: this.reportForm.value.text,
      reported_post_id: this.reportPostID
    }

    this.reportService.reportPost(reportInformation).subscribe(reportResponse => {

      this.reportFinished = true;

    });
    

  }

  closeModal() {

    this.listPostComponent.openModal()

  }

  openModal() {


      this.modalService.open(this.engineModal).result.then((result) => {

      
        this.closeResult = `Closed with: ${result}`;
  
        if(result) {
          console.log('report');
        }
        
      }, (reason) => {
        
  
      });
  }



}

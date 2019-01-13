import { Component,EventEmitter, OnInit, HostListener, Input, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { JwtService, PostService, CommentService, ReportService } from '../../shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ListCommentComponent } from '../../comment/list-comment/list-comment.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ClubService } from '../../shared/services/club.service';



@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  @Input() clubID

  private clubName;
  public postList;
  private show;

  hideComments=[];

  edit = [];

  editComment = [];


  private pagination: number = 0;
  private report = false;
  
  
  token;

  reportPostID;

  reportForm: FormGroup;
  public reportList = [];
  reportFinished = false;
  reportIsValid = false;

  private pinPostId;
  private pinElementeId;


  private commentList = [];

  

  @ViewChild("content") private engineModal: TemplateRef<any>;
  @ViewChild("pin") private pinModal: TemplateRef<any>;
  @ViewChild("closeBtn") private closeBtn: ElementRef;
  dialog: NgbModalRef | null;
  private closeResult;
  private popUpModal = false;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private jwtService: JwtService,
    private postService: PostService,
    private modalService: NgbModal,
    private listCommentComponent: ListCommentComponent,
    private fb: FormBuilder,
    private reportService: ReportService,
    private clubService: ClubService) {

      this.token = JSON.parse(this.jwtService.getToken());

      this.activatedRoute.params.subscribe((params: Params) => {
        this.clubName = params['clubName'];
      });

      const paginationInformation = {
        pagination: this.pagination,
        clubName: this.clubName
      }

      //reset the postList Variable
      this.postService.resetClubList();

      //get the postList and set postList variable inside the postService
      this.postService.getPosts(paginationInformation).subscribe(
        postListResponse=> {

          this.pagination = this.pagination + 5;

          //get the postList variable from postService
          this.postList = this.postService.postList[0];

          console.log(this.postList);

        }
      )


      this.reportForm = this.fb.group({
        'report': new FormControl(null),
        'text': ['', Validators.required],
      });

      this.reportFinished = false;

      this.reportForm.controls['report'].setValue('default', {onlySelf: true});

   }

  ngOnInit() {

  }

  public showComments(i, commentID, comment) {

    if(comment){

      this.listCommentComponent.commentList2.push(comment.comment);

      if(this.hideComments[i] ) {

      } else {

        this.hideComments[i] = !this.hideComments[i];

      }

    } else {

        this.hideComments[i] = !this.hideComments[i];

    }
    
  }

  postReport(i, postId) {

    
    this.reportPostID = postId;
    this.report = true;
    this.openModal();

  }

  
  public postEdit(i, postId) {
      
    this.edit[i] = !this.edit[i];

  }

  onScrollDown() {

    const paginationInformation = {
      pagination: this.pagination,
      clubName: this.clubName
    }

    this.postService.getPosts(paginationInformation).subscribe(
      postList=> {
          
          postList.postList.forEach(i => {
            this.postList.push(i);
          });

          this.pagination = this.pagination + 5;
      }
    )
  }

  commentEdit(i, commentID) {
    console.log(commentID + '   :   ' + i);

    if(this.editComment[i]){

      this.editComment[i] = !this.editComment[i];


    } else {
      
      this.editComment[i] = !this.editComment[i];


    }
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

  pinPost() {

    const pinInformation = {
      post_id: this.pinPostId,
      club_id: this.clubService.clubInformations.id
    }

    this.postService.pinAPost(pinInformation).subscribe( pinResponse => {

      this.postList[this.pinElementeId].pinned = 1;

      let arr = this.postList.splice(this.pinElementeId,1);

      this.postList.unshift(arr[0]);

      $("#closeBtn").click();

    });
  }

  removePin(element_id, post_id) {

    const pinInformation = {
      post_id: post_id,
      club_id: this.clubService.clubInformations.id
    }

    this.postService.removePin(pinInformation).subscribe( removePinResponse => {
      console.log('works');

    });

  }

  public openPinModal(element_id, post_id) {

    this.pinPostId = post_id;
    this.pinElementeId = element_id;

    this.modalService.open(this.pinModal).result.then((result) => {

      
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


}

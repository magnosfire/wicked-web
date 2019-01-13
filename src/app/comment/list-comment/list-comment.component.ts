import { Component,EventEmitter, OnInit, HostListener, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { JwtService, PostService, CommentService, ReportService } from '../../shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ListPostComponent } from '../../post/list-post/list-post.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  @Input() commentList: any;
  @Input() postId: number;
  @Input() commentId: number;

  private test =  true;
  public commentList2 = [];
  public replyList = [];
  replyme=[];
  replied = new EventEmitter<boolean>();
  hideme=[];
  hided = new EventEmitter<boolean>();
  public edit;
  //private commentList;
  public editComment = [];
  public editedComment = new EventEmitter<boolean>();

  public editReply = [];
  public editedReply = new EventEmitter<boolean>();

  private reply = [];

  token;


  private replyTargetUsername = '';

  private replyCommentVisible = [];

  /*----- MODAL   -------*/

  @ViewChild("content") private engineModal: TemplateRef<any>;
  dialog: NgbModalRef | null;
  private closeResult;
  private popUpModal = false;

  /*----- REPORT  ------*/
  reportCommentID;
  private report = false;
  reportForm: FormGroup;
  public reportList = [];
  reportFinished = false;
  reportIsValid = false;


  
  constructor(
    private commentService: CommentService,
    private fb: FormBuilder,
    private jwtService: JwtService,
    private modalService: NgbModal,
    private reportService: ReportService
  ) { 

    this.token = JSON.parse(this.jwtService.getToken());

    this.reportForm = this.fb.group({
      'report': new FormControl(null),
      'text': ['', Validators.required],
    });

    this.reportFinished = false;

    this.reportForm.controls['report'].setValue('default', {onlySelf: true});
    

  }
  

  ngOnInit() {


    console.log('PASSOU');
    
    if(this.commentId) {

      const commentInformation = {
        commentId: this.commentId,
        token: this.token.token
      }

      this.commentService.getCommentsReply(commentInformation).subscribe(
        commentList =>{

          this.replyList = commentList.commentList;
      
        }
      );

    } else {

      const commentInformation = {
        postId: this.postId,
        token: this.token.token
      }

      this.commentService.getComments(commentInformation).subscribe(
        commentList =>{
          this.commentList2 = this.commentService.commentList;
      
        }
      );

    }

  }

  commentEdit(i, commentID) {

    if(this.editComment[i]){

      this.editComment[i] = !this.editComment[i];
      this.editedComment.emit(true);

    } else {
      
      this.editComment[i] = !this.editComment[i];
      this.editedComment.emit(false);

    }
  }

  public showComments(i, commentID, afterSave) {

    const commentInformation = {
      commentId: commentID,
      token: this.token.token
    }

    this.commentService.getCommentsReply(commentInformation).subscribe(
      commentList =>{

        this.replyList = commentList.commentList;
        console.log(this.replyList);
    
      }
    );

    if(this.hideme[i]){

      if(afterSave) {

        if(this.hideme[i]) {

        } else {

          this.hideme[i] = !this.hideme[i];
          this.hided.emit(true);

        }
      } else {
        this.hideme[i] = !this.hideme[i];
        this.hided.emit(true);
      }

    } else {
      
      this.hideme[i] = !this.hideme[i];

      this.hided.emit(false);
      
    }
    
  }

  
  public replyComment(i, commentID) {

    this.replyCommentVisible[i] = !this.replyCommentVisible[i];

    if(this.replyme[i]){

      this.replyme[i] = !this.replyme[i];
      this.replied.emit(true);

    } else {

      this.replyme[i] = !this.replyme[i];

      this.replied.emit(false);
    }

  }

  public replyReply(i, commentID, replyOwnerUsername) {

    console.log('EU');
    this.replyTargetUsername = replyOwnerUsername;
    

    if(this.replyme[i]){

      this.replyme[i] = !this.replyme[i];
      this.replied.emit(true);

    } else {

      this.replyme[i] = !this.replyme[i];

      this.replied.emit(false);
    }

  }

  replyEdit(i, commentID) {

    if(this.editReply[i]){

      this.editReply[i] = !this.editReply[i];
      this.editedReply.emit(true);

    } else {
      
      this.editReply[i] = !this.editReply[i];
      this.editedReply.emit(false);

    }
  }

  public teste (value) {

    console.log(value);

    this.replyList.push(value);

  }

  /* REPORT SECTION */

  postReport(elementID, reportID) {
    this.reportCommentID = reportID;
    this.report = true;
    this.openModal();

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
      reported_comment_id: this.reportCommentID
    }

    this.reportService.reportComment(reportInformation).subscribe(reportResponse => {

      this.reportFinished = true;
      this.reportForm.reset();
      this.reportForm.controls['report'].setValue('default', {onlySelf: true});

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

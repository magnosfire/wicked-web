import { Component,EventEmitter, OnInit, HostListener, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { JwtService, PostService, CommentService } from '../../shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ListPostComponent } from '../../post/list-post/list-post.component';

@Component({
  selector: 'app-list-reply-comment',
  templateUrl: './list-reply-comment.component.html',
  styleUrls: ['./list-reply-comment.component.css']
})
export class ListReplyCommentComponent implements OnInit {

  @Input() commentList: any;
  @Input() postId: number;
  @Input() commentID: number;

  @Input() replyInformation: any;
  @Input() elementID: any;

  public test;
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

  constructor(
    private commentService: CommentService,
    private jwtService: JwtService
  ) { 

    this.token = JSON.parse(this.jwtService.getToken());

  }

  ngOnInit() {

  }

  commentEdit(i, commentID) {
    console.log(commentID + '   :   ' + i);

    if(this.editComment[i]){

      this.editComment[i] = !this.editComment[i];
      this.editedComment.emit(true);

    } else {
      
      this.editComment[i] = !this.editComment[i];
      this.editedComment.emit(false);

    }
  }

  public replyComment(i, commentID) {

    if(this.replyme[i]){

      this.replyme[i] = !this.replyme[i];
      this.replied.emit(true);

    } else {

      this.replyme[i] = !this.replyme[i];

      this.replied.emit(false);
    }

  }

  replyEdit(i, commentID) {
    console.log(commentID + '<-------------------');

    if(this.editReply[i]){

      console.log(commentID + '<-------------------2');

      this.editReply[i] = !this.editReply[i];
      this.editedReply.emit(true);

    } else {

      console.log(commentID + '<-------------------3');
      
      this.editReply[i] = !this.editReply[i];
      this.editedReply.emit(false);

    }
  }

}

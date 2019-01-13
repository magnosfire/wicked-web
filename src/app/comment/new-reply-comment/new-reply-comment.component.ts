import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtService, CommentService } from '../../shared';
import { ListCommentComponent } from '../list-comment/list-comment.component';


@Component({
  selector: 'app-new-reply-comment',
  templateUrl: './new-reply-comment.component.html',
  styleUrls: ['./new-reply-comment.component.css']
})
export class NewReplyCommentComponent implements OnInit {

  @Input() postID: any;
  @Input() postElement: any;
  @Input() commentID: any;
  @Input() replyTargetUsername: any;
  

  public commentForm: FormGroup;

  token;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService,
    private commentService: CommentService,
    private listCommentComponent : ListCommentComponent
  ) { 

    this.commentForm = this.fb.group({
      'comment': ['', Validators.required],
    });

    this.token = JSON.parse(this.jwtService.getToken());
    
  }

  ngOnInit() {
    
  }

  submitForm() {

    const regexp = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/g

    this.replyTargetUsername = this.replyTargetUsername.replace(regexp, '- link removed for safety -');


    if(this.replyTargetUsername.trim() == '' || !this.replyTargetUsername) {

    } else {

      const commentInformation = {
        token: this.token.token,
        comment: this.replyTargetUsername.replace(new RegExp('\n', 'g'), "<br />"),
        post_id: this.postID,
        comment_id: this.commentID || ''
      }  
  
      this.commentService.newComment(commentInformation).subscribe( commentResponse => {

        console.log(commentResponse.comment);
  
        this.listCommentComponent.replyList.push(commentResponse.comment);
  
        this.listCommentComponent.commentList2[this.postElement].comments = this.listCommentComponent.commentList2[this.postElement].comments  + 1;
  
        this.replyTargetUsername = '';
  
      });

    }

  }


  

}

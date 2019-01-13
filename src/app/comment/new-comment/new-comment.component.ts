import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtService, CommentService } from '../../shared';
import { ListPostComponent } from '../../post/list-post/list-post.component';
import { ListCommentComponent } from '../list-comment/list-comment.component';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() postID: any;
  @Input() postElement: any;
  @Input() commentID: any;
  commentForm: FormGroup;
  token;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService,
    private commentService: CommentService,
    private listPostComponent : ListPostComponent,
    private listCommentComponent: ListCommentComponent
  ) { 

    this.commentForm = this.fb.group({
      'comment': ['', Validators.required],
    });

    this.token = JSON.parse(this.jwtService.getToken());
    
  }

  ngOnInit() {
    
  }

  submitForm() {


    const commentInformation = {
      token: this.token.token,
      comment: this.commentForm.value.comment.replace(new RegExp('\n', 'g'), "<br />"),
      post_id: this.postID,
      comment_id: this.commentID || ''
    }

    this.commentService.newComment(commentInformation).subscribe( commentResponse => {

        //update the number of comments
        this.listPostComponent.postList[this.postElement].comments = this.listPostComponent.postList[this.postElement].comments  + 1;

        //open the comment list
        this.listPostComponent.showComments(this.postElement, this.postID, commentResponse);

        this.commentService.commentList.push(commentResponse.comment);

        //clear form
        this.commentForm.reset();

    });

  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../../shared';
import { ListPostComponent } from '../../post/list-post/list-post.component';
//import { listCommentComponent } from '../list-comment/list-comment.component';
import { ListCommentComponent } from '../../comment/list-comment/list-comment.component';
import { ListReplyCommentComponent } from '../list-reply-comment/list-reply-comment.component';

@Component({
  selector: 'app-update-reply-comment',
  templateUrl: './update-reply-comment.component.html',
  styleUrls: ['./update-reply-comment.component.css']
})
export class UpdateReplyCommentComponent implements OnInit {

  @Input() commentID;
  @Input() commentElement;
  @Input() commentText;
  @Input() reply;

  editCommentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private listReplyCommentComponent: ListReplyCommentComponent,
    private listCommentComponent: ListCommentComponent
  ) {

    this.editCommentForm = this.fb.group({
      'editComment': ['', Validators.required],
    });

   }

  ngOnInit() {

    this.editCommentForm.controls['editComment'].setValue(this.commentText);

  }

  submitForm() {

    const commentInformation = {
      comment_id: this.commentID,
      text: this.editCommentForm.value.editComment.replace(new RegExp('\n', 'g'), "<br />")
    }

    this.commentService.updateComment(commentInformation).subscribe( updateCommentResponse => {

        this.listCommentComponent.replyList[this.commentElement].text = updateCommentResponse.comment.text;
        this.listCommentComponent.replyList[this.commentElement].edit = updateCommentResponse.comment.edit;
        this.listCommentComponent.replyList[this.commentElement].edit_date = updateCommentResponse.comment.edit_date;

        this.listCommentComponent.replyEdit(this.commentElement, this.commentID);

    });



  }
}

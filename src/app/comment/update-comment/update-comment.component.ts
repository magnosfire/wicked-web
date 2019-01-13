import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../../shared';
import { ListPostComponent } from '../../post/list-post/list-post.component';
import { ListCommentComponent } from '../list-comment/list-comment.component';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent implements OnInit {

  @Input() commentID;
  @Input() commentElement;
  @Input() commentText;
  @Input() reply;

  editCommentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
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

    console.log(this.editCommentForm.value.editComment);

    const commentInformation = {
      comment_id: this.commentID,
      text: this.editCommentForm.value.editComment.replace(new RegExp('\n', 'g'), "<br />")
    }

    this.commentService.updateComment(commentInformation).subscribe( updateCommentResponse => {

      if(this.reply) {

        this.listCommentComponent.replyList[this.commentElement].text = updateCommentResponse.comment.text;
        this.listCommentComponent.replyList[this.commentElement].edit = updateCommentResponse.comment.edit;
        this.listCommentComponent.replyList[this.commentElement].edit_date = updateCommentResponse.comment.edit_date;

        this.listCommentComponent.replyEdit(this.commentElement, this.commentID);

      } else {

        this.listCommentComponent.commentList2[this.commentElement].text = updateCommentResponse.comment.text;
        this.listCommentComponent.commentList2[this.commentElement].edit = updateCommentResponse.comment.edit;
        this.listCommentComponent.commentList2[this.commentElement].edit_date = updateCommentResponse.comment.edit_date;

        this.listCommentComponent.commentEdit(this.commentElement, this.commentID);

      }

      

    });



  }
}

import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentComponent } from './comment.component';
import { SharedModule } from '../shared';
import { UpdateCommentComponent } from './update-comment/update-comment.component';
import { DeleteCommentComponent } from './delete-comment/delete-comment.component';
import { ListCommentComponent } from './list-comment/list-comment.component';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { ReplyCommentModule } from '../reply-comment';
import { NewReplyCommentComponent } from './new-reply-comment/new-reply-comment.component';
import { ListReplyCommentComponent } from '../reply-comment/list-reply-comment/list-reply-comment.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReplyCommentModule
  ],
  declarations: [
    CommentComponent,
    UpdateCommentComponent,
    DeleteCommentComponent,
    ListCommentComponent,
    NewCommentComponent,
    NewReplyCommentComponent
  ],
  providers: [
    ListCommentComponent,
    ListReplyCommentComponent
  ],
  exports: [
    ListCommentComponent,
    UpdateCommentComponent,
    DeleteCommentComponent,
    ListCommentComponent,
    NewCommentComponent,
    NewReplyCommentComponent
  ]
})
export class CommentModule {}

import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReplyCommentComponent } from './reply-comment.component';
import { SharedModule } from '../shared';
import { ListReplyCommentComponent } from './list-reply-comment/list-reply-comment.component';
import { DeleteReplyCommentComponent } from './delete-reply-comment/delete-reply-comment.component';
import { UpdateReplyCommentComponent } from './update-reply-comment/update-reply-comment.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ReplyCommentComponent,
    UpdateReplyCommentComponent,
    DeleteReplyCommentComponent,
    ListReplyCommentComponent
  ],
  providers: [
  ],
  exports: [
    UpdateReplyCommentComponent,
    DeleteReplyCommentComponent,
    ListReplyCommentComponent
  ]
})
export class ReplyCommentModule {}

import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import {CommentModule} from '../comment';
import {ListPostComponent} from './list-post/list-post.component';
import {PostComponent} from './post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ReportPostComponent } from './report-post/report-post.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommentModule,
    InfiniteScrollModule
  ],
  declarations: [
    ListPostComponent,
    NewPostComponent,
    PostComponent,
    UpdatePostComponent,
    ReportPostComponent
  ],
  exports: [
    ListPostComponent,
    NewPostComponent,
    UpdatePostComponent
  ],
  providers: [
  ]
})
export class PostModule {}

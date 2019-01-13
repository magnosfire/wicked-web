import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { CommentModule} from '../comment';
import { PostModule} from '../post/post.module';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password.routing.module';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    SharedModule,
    CommentModule,
    PostModule
  ],
  declarations: [
    ResetPasswordComponent,
    NewPasswordComponent
  
  ],
  providers: [
  ]
})
export class ResetPasswordModule {}

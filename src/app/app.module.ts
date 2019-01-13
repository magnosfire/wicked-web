import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import {
  ApiService,
  PostService,
  FooterComponent,
  HeaderComponent,
  HomeHeaderComponent,
  JwtService,
  SharedModule,
  HttpTokenInterceptor,
  CallbackPipe
} from './shared';
import {ClubModule} from './club/club.module';
import {ClubComponent} from './club/club.component';
import {ClubRoutingModule} from './club/club.routing.module';
import {LocationService, UserService, CommentService, EmailService, ReportService, ProfileService, MessageService} from './shared/services';
import {ProfileRoutingModule} from './profile/profile.routing.module';
import {ProfileModule} from './profile/profile.module';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PostModule} from './post/post.module';
import {MessageModule} from './message/message.module';
import {RegisterRoutingModule} from './register/register.routing.module';
import {RegisterModule} from './register/register.module';
import {DialogComponent} from './shared/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthService} from './shared/services/auth.service';
import {AuthGuard} from './shared/services';

import {ClubService} from './shared/services/club.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ResetPasswordRoutingModule } from './reset-password/reset-password.routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReplyCommentModule } from './reply-comment';
import { CommentModule } from './comment';


const rootRouting = RouterModule.forRoot([
  {path: '', component: AppComponent},
  {path: 'resetpassword', loadChildren: 'app/reset-password/reset-password.module#ResetPasswordModule'},
  {
    path: 'club',
    loadChildren: 'app/club/club.module#ClubModule'
  },
  {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule'
  },
  {
    path: 'message',
    loadChildren: 'app/message/message.module#MessageModule'
  },
  {
    path: 'register',
    loadChildren: 'app/register/register.module#RegisterModule'
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeHeaderComponent,
    LandingPageComponent,
    DialogComponent,
    CallbackPipe
    
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AuthModule,
    rootRouting,
    SharedModule,
    ClubModule,
    ProfileModule,
    ClubRoutingModule,
    ProfileRoutingModule,
    PostModule,
    MessageModule,
    RegisterRoutingModule,
    RegisterModule,
    ResetPasswordModule,
    ResetPasswordRoutingModule,
    BrowserAnimationsModule,
    CommentModule,
    ReplyCommentModule
    
  ],
  providers: [
    ApiService,
    PostService,
    JwtService,
    UserService,
    AuthGuard,
    DialogComponent,
    LocationService,
    ClubService,
    AuthService,
    PostService,
    CommentService,
    EmailService,
    ReportService,
    ProfileService,
    MessageService
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';



import { SharedModule } from '../shared';
import { ClubRoutingModule} from './club.routing.module';
import { NewClubComponent} from './new-club/new-club.component';
import { CommentModule} from '../comment';
import { ViewClubComponent} from './view-club/view-club.component';
import { MembersClubsComponent} from './members-club/members-clubs.component';
import { PostModule} from '../post/post.module';
import { SearchClubComponent } from './search-club/search-club.component';
import { ListClubComponent } from './list-club/list-club.component';
import { ClubComponent } from './club.component';
import { ClubModalComponent } from './modal-club/modal.component';
import { NouisliderComponent } from 'ng2-nouislider';
import { ApplicationClubComponent } from './application-club/application-club.component';
import { ModerationClubComponent } from './moderation-club/moderation-club.component';
import { NewMembersClubComponent } from './new-members-club/new-members-club.component';
import { EditClubComponent } from './edit-club/edit-club.component';
import { SettingsClubComponent } from './settings-club/settings-club.component';

@NgModule({
  imports: [
    CommonModule,
    ClubRoutingModule,
    SharedModule
  ],
  declarations: [
    NewClubComponent,
    ViewClubComponent,
    MembersClubsComponent,
    SearchClubComponent,
    ListClubComponent,
    ClubComponent,
    ClubModalComponent,
    ApplicationClubComponent,
    NouisliderComponent,
    ModerationClubComponent,
    NewMembersClubComponent,
    EditClubComponent,
    SettingsClubComponent
  ],
  providers: [
  ]
})
export class ClubModule {}

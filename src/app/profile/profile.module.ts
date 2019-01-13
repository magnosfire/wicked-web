import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared';
import { CommentModule } from '../comment';
import { ProfileRoutingModule } from './profile.routing.module';
import { ProfileGalleryComponent } from './profile-gallery/profile-gallery.component';
import { ProfileClubsComponent} from './profile-clubs/profile-clubs.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfilePrivacyComponent } from './profile-privacy/profile-privacy.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ProfilePremiumComponent } from './profile-premium/profile-premium.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    CommentModule
  ],
  declarations: [
    ProfileComponent,
    ProfileGalleryComponent,
    ProfileClubsComponent,
    ProfileSettingsComponent,
    ProfilePrivacyComponent,
    ProfileAccountComponent,
    ProfilePremiumComponent,
    ProfileEditComponent
  ],
  providers: [
    /*ClubAuthResolver*/
  ]
})
export class ProfileModule {}

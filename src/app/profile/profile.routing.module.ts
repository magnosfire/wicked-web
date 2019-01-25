import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import {AuthGuard} from '../shared/services';
import { Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {ProfileGalleryComponent} from './profile-gallery/profile-gallery.component';
import {ProfileClubsComponent} from './profile-clubs/profile-clubs.component';

import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfilePrivacyComponent } from './profile-privacy/profile-privacy.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ProfilePremiumComponent } from './profile-premium/profile-premium.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const profileRoutes: Routes = [
  {path: 'profile',
    children: [
      {
        path: '',
        component: ProfileComponent
      },
      {
        path: 'gallery',
        component: ProfileGalleryComponent
      },
      {
        path: 'clubs',
        component: ProfileClubsComponent
      },
      {
        path: 'settings',
        component: ProfileSettingsComponent,
        children:[
          {
            path: 'privacy',
            component: ProfilePrivacyComponent
          },
          {
            path: 'account',
            component: ProfileAccountComponent
          },
          {
            path: 'premium',
            component: ProfilePremiumComponent
          },
          {
            path: 'edit',
            component: ProfileEditComponent
          }
        ]
      },
      {
        path: ':username', component: ProfileComponent,
        children: [
          {
            path: 'gallery',
            component: ProfileGalleryComponent
          },
          {
            path: 'clubs',
            component: ProfileClubsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule {}

/*
children:[
          {
            path: '',
            component: ProfileSettingsComponent
          },
          {
            path: 'privacy',
            component: ProfilePrivacyComponent
          },
          {
            path: 'account',
            component: ProfileAccountComponent
          },
          {
            path: 'premium',
            component: ProfilePremiumComponent
          },
          {
            path: 'edit',
            component: ProfileEditComponent
          }
        ]*/
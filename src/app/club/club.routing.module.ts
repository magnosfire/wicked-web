import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {NewClubComponent} from './new-club/new-club.component';
import {ClubComponent} from './club.component';
import {ListClubComponent} from './list-club/list-club.component';
import {ViewClubComponent} from './view-club/view-club.component';
import {ListPostComponent} from '../post/list-post/list-post.component';
import {MembersClubsComponent} from './members-club/members-clubs.component';
import {AuthGuard} from '../shared/services';
import { ModerationClubComponent } from './moderation-club/moderation-club.component';
import { NewMembersClubComponent } from './new-members-club/new-members-club.component';
import { EditClubComponent } from './edit-club/edit-club.component';
import { SettingsClubComponent } from './settings-club/settings-club.component';

const clubRoutes: Routes = [
  {path: 'club',
    children: [
      {
        path: '',
        component: ListClubComponent
      },
      {
        path: 'new',
        component: NewClubComponent
      },
      {
        path: ':clubName',
        component: ViewClubComponent,
        children: [
          {
            path: '',
            component: ListPostComponent
          },
          {
            path: 'gallery',
            component: NewClubComponent
          },
          {
            path: 'members',
            component: MembersClubsComponent
          },
          {
            path: 'about',
            component: MembersClubsComponent
          },
          {
            path: 'manage',
            component: ModerationClubComponent,
            children: [
              {
                path: 'edit',
                component: EditClubComponent
              },
              {
                path: 'new-members',
                component: NewMembersClubComponent
              }
              ,
              {
                path: 'settings',
                component: SettingsClubComponent
              }
            ]
          }
        ]
      }
    ], canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(clubRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClubRoutingModule {}



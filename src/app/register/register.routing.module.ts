import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../shared/services';
import {RegisterComponent} from './register.component';
import {RegisterInformationComponent} from './register-information/register.information.component';
import {RegisterClubComponent} from './register-club/register-club.component';

const registerRoutes: Routes = [
  {path: 'register', component: RegisterInformationComponent,
    children: [
      {
        path: 'information',
        component: RegisterComponent
      },
      {
        path: 'club',
        component: RegisterClubComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(registerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterRoutingModule {}



import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthGuard} from '../shared/services';
import { ResetPasswordComponent } from './reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const resetPasswordRoutes: Routes = [
  {path: 'resetpassword',
    children: [
      {
        path: '',
        component: ResetPasswordComponent
      },
      {
        path: ':passwordString',
        component: NewPasswordComponent
      }

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(resetPasswordRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ResetPasswordRoutingModule {}



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { RegisterComponent } from './register.component';
import { RegisterClubComponent } from './register-club/register-club.component';
import { RegisterInformationComponent } from './register-information/register.information.component';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';




@NgModule({
  imports: [
    CommonModule,
    SharedModule
    
  ],
  declarations: [
    RegisterComponent,
    RegisterClubComponent,
    RegisterInformationComponent,
    RegisterNewUserComponent
    
    
  ],
  providers: [

  ],
  exports : [
    RegisterNewUserComponent
  ]

})
export class RegisterModule {}

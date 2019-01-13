import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

/*import { ClubAuthResolver } from './club-auth-resolver.service';*/
import { SharedModule } from '../shared';
import {CommentModule} from '../comment';
import {LandingPageComponent} from './landing-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageModalComponent } from './modal-landing-page/modal-landing-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommentModule,
    NgbModule
  ],
  declarations: [
    LandingPageComponent,
    LandingPageModalComponent
  ],
  providers: [
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule {}

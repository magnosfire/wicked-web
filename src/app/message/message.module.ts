import { NgModule, ModuleWithProviders  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { MessageRoutingModule} from './message.routing.module';
import { MessageComponent} from './message.component';
import { MessageContentComponent} from './message-content/message-content.component';

@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule,
    SharedModule
  ],
  declarations: [
    MessageComponent,
    MessageContentComponent
  ],
  providers: [
  ]
})


export class MessageModule {}

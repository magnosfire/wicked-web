import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {MessageComponent} from './message.component';
import { MessageContentComponent } from './message-content/message-content.component';

const messageRoutes: Routes = [
  {path: 'message',
    component: MessageComponent,
    children: [
      {
        path: ':contactName',
        component: MessageContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(messageRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class MessageRoutingModule {}



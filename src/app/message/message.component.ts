import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User, UserService, MessageService, JwtService } from '../shared';

@Component({
  selector: 'app-message-page',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  token: any = '';

  user: User = {} as User;
  messageForm: FormGroup;
  errors: Object = {};
  contacts: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private jwtService: JwtService
  ) {

    this.token = JSON.parse(this.jwtService.getToken());

    const userInformation = {
      token: this.token.token
    }

    this.messageService.getChat(userInformation).subscribe(chatListResponse => {

      console.log(chatListResponse);
      this.contacts = chatListResponse.chatList;

    });

  }

  submitForm() {

  }

  ngOnInit() {}
  
}

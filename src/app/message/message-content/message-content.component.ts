import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import { MessageService, JwtService } from '../../shared';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.css']
})
export class MessageContentComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  id: number;
  messageForm: FormGroup;
  curso: any;
  private token;
  private contactUsername;
  private messageList: any = [];
  private user_receiver_id : any = '';

  constructor(
    private router: Router ,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private jwtService: JwtService
  ) {

    this.messageList = [];

    this.messageForm = this.fb.group({
      message: ''
    });

    this.token = JSON.parse(this.jwtService.getToken());


    this.scrollToBottom();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.contactUsername = params['contactName'];

      const chatInformation = {
        token: this.token.token,
        message_to: this.contactUsername
      }
  
      console.log(chatInformation);
  
      this.messageService.getChatMessages(chatInformation).subscribe(messageListReponse => {
        
        console.log(messageListReponse.messageList);
        this.messageList = messageListReponse.messageList;
        this.user_receiver_id = messageListReponse.user_receiver_id;
        
      });
  
    });

    


  }

  ngOnInit() {

    

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }catch(err) {

    }
  }

  submitMessage() {

    const messageInformation = {
      token: this.token.token,
      message : this.messageForm.value.message,
      message_to_user_id : this.user_receiver_id,
      chat_id : this.messageList[0].chat_id
    }

    this.messageService.sendMessage(messageInformation).subscribe(messageResponse => {
      console.log(messageResponse.newMessage);
      this.messageList.push(messageResponse.newMessage);
      this.messageForm.reset();
    });

  }

}

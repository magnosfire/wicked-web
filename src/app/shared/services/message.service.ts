import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators/map';


@Injectable()
export class MessageService {

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
  ) {}

  getChat(userInformation): Observable<any> {
    return this.apiService.post('/message/chat', userInformation)
      .pipe(map(
        chatResponse => {
          return chatResponse;
        }
      ));
  }

  getChatMessages(userInformation): Observable<any> {
    return this.apiService.post('/message/chatMessages', userInformation)
      .pipe(map(
        messageListResponse => {
          return messageListResponse;
        }
      ));
  }

  sendMessage(messageInformation): Observable<any> {
    return this.apiService.post('/message/sendMessage', messageInformation)
      .pipe(map(
        messageResponse => {
          return messageResponse;
        }
      ));
  }


}

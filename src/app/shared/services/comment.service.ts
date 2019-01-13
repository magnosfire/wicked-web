import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';


@Injectable()
export class CommentService {

  private currentClubSubject = new BehaviorSubject<any>({} as any);
  public currentClub$ = this.currentClubSubject.asObservable().pipe(distinctUntilChanged());

  public commentList = [];
  public replyList = [];

  constructor (
    private apiService: ApiService
  ) {}

  newComment(CommentData): Observable<any> {
    return this.apiService.post('/comment', CommentData)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  getComments(commentInformation): Observable<any> {

    return this.apiService.get('/comment/' + commentInformation.postId  + '&' + commentInformation.token)
      .pipe(map(
        commentListResponse => {

          this.commentList = commentListResponse.commentList;

          console.log('this.commentList');
          console.log(this.commentList);
          console.log('this.commentList');


          return commentListResponse;
        }
      ));
  }

  getCommentsReply(commentInformation): Observable<any> {

    return this.apiService.get('/comment/getReplies/' + commentInformation.commentId  + '&' + commentInformation.token)
      .pipe(map(
        commentList => {
          return commentList;
        }
      ));
  }

  updateComment(commentData): Observable<any> {
    return this.apiService.post('/comment/updateComment', commentData)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

}


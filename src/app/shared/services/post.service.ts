import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';
import { Post } from '../models';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';


@Injectable()
export class PostService {



  public postList = [];

  private value = 0;

  constructor (
    private apiService: ApiService
  ) {}

  savePost(postData): Observable<any> {
    return this.apiService.post('/post', postData)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }

  updatePost(postData): Observable<any> {
    return this.apiService.post('/post/updatePost', postData)
      .pipe(map(
        data => {
          return data;
        }
      ));
  }


  getPosts(paginationInformation): Observable<any> {

    return this.apiService.get('/post/' + paginationInformation.pagination + '&' + paginationInformation.clubName)
      .pipe(map(
        postList => {
          this.addPostInPostList(postList.postList);
          return postList;
        }
      ));
  }

  pinAPost(pinInformation) {

    return this.apiService.post('/post/pinAPost',pinInformation)
      .pipe(map(
        pinResponse => {

          return pinResponse;
        }
      ));

  }

  removePin(pinInformation) {

    return this.apiService.post('/post/removePin',pinInformation)
      .pipe(map(
        pinResponse => {

          return pinResponse;
        }
      ));

  }

  addPostInPostList(post:Post) {

    if(this.postList[0]=== undefined) {
      this.postList.push(post);
      this.value = 1;
    } else {
      if(this.value = 1) {
        this.value = 0;
      } else {
        this.postList[0].concat(post);
      }
      
    }
    
  }

  resetClubList() {
    this.postList = [];
  }

}


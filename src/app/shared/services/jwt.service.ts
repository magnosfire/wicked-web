import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken() {
    return localStorage.getItem('token');
  }

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  destroyToken() {
    localStorage.removeItem('token');
  }

}

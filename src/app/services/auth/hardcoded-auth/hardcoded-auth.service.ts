import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthService {

  constructor() { }

  authenticate(username, password): boolean {
    if (username === 'thomas' && password === 'pass') {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    }
    return false;
  }

  isUserLoggedIn(): boolean {
    if (sessionStorage.getItem('authenticatedUser')) {
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.clear();
  }

}

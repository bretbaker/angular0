import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';

@Injectable({
  providedIn: 'root'
})

export class BasicAuthService {

  constructor(
    private http: HttpClient
  ) { }

  authenticate(username, password): boolean {
    if (username === 'thomas' && password === 'pass') {
      sessionStorage.setItem(AUTHENTICATED_USER, username);
      return true;
    }
    return false;
  }

  executeJwtAuthService(username, password): Observable<AuthBean> {
    return this.http.post<any>(`${API_URL}/authenticate`, {
      username: username,
      password: password
    }).pipe(
      map(
        response => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${response.token}`);
          return response;
        }
      )
    );
  }

  executeAuthService(username, password): Observable<AuthBean> {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let header = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<AuthBean>(`${API_URL}/basic-auth`,
    { headers: header }).pipe(
      map(
        response => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return response;
        }
      )
    );
  }

  getAuthenticatedUser(): string {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(): string {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn(): boolean {
    if (sessionStorage.getItem(AUTHENTICATED_USER)) {
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.clear();
  }

}

export class AuthBean {

  constructor(
    public message: string
  ) { }

}

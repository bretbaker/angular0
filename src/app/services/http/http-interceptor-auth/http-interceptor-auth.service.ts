import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicAuthService } from '../../auth/basic-auth/basic-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorAuthService implements HttpInterceptor {

  username: string;
  password: string;
  basicAuthHeaderString: string;

  constructor(
    private basicAuthService: BasicAuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.username = 'user';
    // this.password = 'password';
    // this.basicAuthHeaderString = 'Basic ' + window.btoa(this.username + ':' + this.password);
    this.username = this.basicAuthService.getAuthenticatedUser();
    this.basicAuthHeaderString = this.basicAuthService.getAuthenticatedToken();
    if (this.username && this.basicAuthHeaderString) {
      req = req.clone({
        setHeaders: {
          Authorization: this.basicAuthHeaderString
        }
      });
    }
    return next.handle(req);
  }

}

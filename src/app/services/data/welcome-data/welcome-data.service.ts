import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HelloWorldBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWorldBeanService(): Observable<HelloWorldBean> {
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

  executeHelloWorldBeanServiceWithPathVariable(name): Observable<HelloWorldBean> {
    // let basicAuthHeaderString = this.createBasicAuthenticatedHttpHeader();
    // let header = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // });
    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`,
      // { headers: header }
    );
  }
  
  // createBasicAuthenticatedHttpHeader(): string {
  //   let username = 'user';
  //   let password = 'password';
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }

}

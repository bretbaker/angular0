import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthService } from '../../services/auth/hardcoded-auth/hardcoded-auth.service';
import { BasicAuthService } from '../../services/auth/basic-auth/basic-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = 'Invalid Credentials';
  invalidLogin: boolean = false;

  constructor(
    private router: Router, 
    private hardcodedAuthService: HardcodedAuthService,
    private basicAuthService: BasicAuthService
    ) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    if (this.hardcodedAuthService.authenticate(this.username, this.password)) {
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
      setTimeout(() => {
        this.invalidLogin = false;
      }, 3000);
    }
  }

  handleBasicAuthLogin(): void {
    this.basicAuthService.executeAuthService(this.username, this.password).subscribe(response => {
      console.log(response);
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false
    }, error => {
      console.log(error);
      this.invalidLogin = true;
    });
  }

  handleJwtAuthLogin(): void {
    this.basicAuthService.executeJwtAuthService(this.username, this.password).subscribe(response => {
      console.log(response);
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false
    }, error => {
      console.log(error);
      this.invalidLogin = true;
    });
  }

}

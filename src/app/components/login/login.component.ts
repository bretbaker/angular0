import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    if (this.username === 'thomas' && this.password === 'pass') {
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
      setTimeout(() => {
        this.invalidLogin = false;
      }, 3000);
    }
  }

}

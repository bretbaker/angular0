import { Component, OnInit } from '@angular/core';
import { HardcodedAuthService } from 'src/app/services/hardcoded-auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  name: string;

  constructor(public hardcodedAuthService: HardcodedAuthService) { }

  ngOnInit(): void {
    this.name = sessionStorage.getItem('authenticatedUser');
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelloWorldBean, WelcomeDataService } from '../../services/data/welcome-data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name: string;
  customWelcomeMsg: string;

  constructor(private route: ActivatedRoute, private service: WelcomeDataService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage(): void {
    this.service.executeHelloWorldBeanService().subscribe(response => {
      this.handleSuccessfulResponse(response);
    }, error => {
      this.handleErrorResponse(error);
    });
  }

  getWelcomeMessageWithParameter(): void {
    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(response => {
      this.handleSuccessfulResponse(response);
    }, error => {
      this.handleErrorResponse(error);
    });
  }

  handleSuccessfulResponse(response: HelloWorldBean): void {
    console.log(response.message);
    this.customWelcomeMsg = response.message;
  }

  handleErrorResponse(error): void {
    this.customWelcomeMsg = error.error.message;
  }

}

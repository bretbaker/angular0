import { Component, OnInit } from '@angular/core';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public targetDate: Date,
    public done: boolean
  ) {  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Array<Todo> = [
    new Todo(1, 'learn to walk', new Date(), false),
    new Todo(2, 'learn to run', new Date(), false),
    new Todo(3, 'learn to fly', new Date(), false)
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

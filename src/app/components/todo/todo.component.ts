import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from 'src/app/services/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoId: number;
  todo: Todo;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.todoId = this.route.snapshot.params['id'];
    this.todo = new Todo(this.todoId, '', new Date(), false);
    if (this.todoId != -1) {
        this.todoService.retrieveTodo('thomas', this.todoId).subscribe(response => {
        this.todo = response;
      });
    }
  }

  saveTodo(): void {
    if (this.todoId <= 0) {
      this.todoService.createTodo('thomas', this.todo).subscribe(response => {
        console.log(response);
        this.router.navigate(['todos']);
      });
    } else {
      this.todoService.updateTodo('thomas', this.todoId, this.todo).subscribe(response => {
        console.log(response);
        this.router.navigate(['todos']);
      });
    }
  }

}

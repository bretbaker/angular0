import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../../services/data/todo-data.service';

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

  todos: Array<Todo>;
  msg: string = null;

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  deleteTodo(todoId): void {
    this.todoService.deleteTodo('thomas', todoId).subscribe(response => {
      this.msg = `Todo ${todoId} has successfully been deleted!`;
      this.refreshTodos();
      setTimeout(() => {
        this.msg = null;
      }, 5000);
    });
  }

  updateTodo(todoId): void {
    this.router.navigate(['todos', todoId]);
  }

  addTodo(): void {
    this.router.navigate(['todos', -1]);
  }

  refreshTodos(): void {
    this.todoService.retrieveAllTodos('thomas').subscribe(response => {
      this.todos = response;
      console.log(this.todos);
    });
  }

}

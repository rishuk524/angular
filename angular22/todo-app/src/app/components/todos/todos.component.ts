import { Component, OnInit } from "@angular/core";
import { TodoService } from "src/app/service/todo.service";

import { Todo } from "./../../model/Todo";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"],
})
export class TodosComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  todos: Todo[];

  constructor(private todoService: TodoService) { this.todos=[]}

  ngOnInit(): void {
    this.todoService.gettodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  changeTodoStatus(todo: Todo) {
    this.todoService.changestatus(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deletetodo(todo);
  }
}

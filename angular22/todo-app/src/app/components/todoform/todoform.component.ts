
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/model/Todo';
import {v4 as uuidv4} from "uuid";
import {TodoService} from "../../service/todo.service";

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.css']
})
export class TodoformComponent implements OnInit {
  'todotitle': string;

  constructor(private todoService: TodoService) {}


  ngOnInit(): void {
  }
  hanldeadd(){
   const newtodo: Todo ={
     id: uuidv4(),
     title: this.todotitle,
     iscompleted:false,
     date: new Date(),
   };

   this.todoService.addtodos(newtodo);
   this.todotitle ="";
  }

}

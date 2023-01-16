import { Injectable } from '@angular/core';
import {of } from 'rxjs';
import {Todo } from "./../model/Todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];
  constructor() {
    this.todos = [
        {
           id: '111',
           title: "Learn c++",
           iscompleted: true,
          date: new Date()
         },
         {

          id: '111',
          title: "Learn React",
          iscompleted: true,
         date: new Date()
         },
         {

          id: '111',
          title: "Learn Angualr",
          iscompleted: false,
         date: new Date()
         },
        ];
      }
      gettodos(){
        return of (this.todos);
      }
       addtodos(todo: Todo){
         this.todos.push(todo)
       }
       changestatus(todo: Todo){
         this.todos.map( singletodos =>{
           if(singletodos.id===todo.id){
             todo.iscompleted =!todo.iscompleted;
           }
         });
       }
       deletetodo(todo: Todo){
         const indexoftodo = this.todos.findIndex(
           (currentobject)=> currentobject.id === todo.id
         );
         this.todos.splice(indexoftodo, 1);
       }

  }





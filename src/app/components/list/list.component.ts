import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: Todo[] = [];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.list = this.todoService.getAllTodos();
  }

  removeTodo(id) {
    this.todoService.deleteTodoById(id);
    this.load();
  }

  toggleComplete(id) {
    let todo = this.todoService.getTodoById(id);
    todo = this.todoService.toggleTodoComplete(todo);
    this.load();
  }

  editTodo(id, edit) {
    let todo = this.todoService.getTodoById(id);
    todo = this.todoService.setEditTodo(todo, edit);
  }

  saveTodo(id) {
    let todo = this.todoService.getTodoById(id);
    todo = this.todoService.updateTodoTitle(todo);
    todo = this.todoService.setEditTodo(todo, false);
  }
}

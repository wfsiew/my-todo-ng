import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;
  @Output() onChange = new EventEmitter();

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  removeTodo(id) {
    this.todoService.deleteTodoById(id);
    this.onChange.emit('load');
  }

  toggleComplete(id) {
    let todo = this.todoService.getTodoById(id);
    todo = this.todoService.toggleTodoComplete(todo);
    this.onChange.emit('load');
  }

  editTodo(id, edit) {
    let todo = this.todoService.getTodoById(id);
    todo = this.todoService.setEditTodo(todo, edit);
  }

  saveTodo(id) {
    let todo = this.todoService.getTodoById(id);
    if (!todo.editText) return;
    todo = this.todoService.updateTodoTitle(todo);
    todo = this.todoService.setEditTodo(todo, false);
  }
}

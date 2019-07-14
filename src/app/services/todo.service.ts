import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  lastid: number = 0;
  todos: Todo[] = [];

  constructor() { }

  loadTodo() {
    let list = localStorage.getItem('ng-todos');
    let id = localStorage.getItem('ng-lastid');

    if (!id) {
      this.todos = [];
      this.lastid = 0;
    }

    else {
      this.todos = JSON.parse(list);
      this.lastid = parseInt(id);
    }
  }

  saveTodo() {
    if (this.todos && this.todos.length) {
      localStorage.setItem('ng-lastid', this.lastid.toString());
      localStorage.setItem('ng-todos', JSON.stringify(this.todos));
    }

    else {
      this.lastid = 0;
      this.todos = [];
      localStorage.setItem('ng-lastid', this.lastid.toString());
      localStorage.setItem('ng-todos', JSON.stringify(this.todos));
    }
  }

  addTodo(todo: Todo) {
    if (!todo.id) {
      todo.id = ++this.lastid;
    }

    this.todos.push(todo);
    this.saveTodo();
  }

  getTodos(): Todo[] {
    this.loadTodo();
    return this.todos;
  }

  getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }

  deleteTodoById(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodo();
  }

  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) return null;
    Object.assign(todo, values);
    this.saveTodo();
    return todo;
  }

  toggleTodoComplete(todo: Todo) {
    let updatedTodo = this.updateTodoById(todo.id, {
      completed: !todo.completed
    });
    return updatedTodo;
  }

  setEditTodo(todo: Todo, edit: boolean) {
    let updatedTodo = this.updateTodoById(todo.id, {
      isEdit: edit,
      editText: todo.text,
    });
    return updatedTodo;
  }

  updateTodoText(todo: Todo) {
    let updatedTodo = this.updateTodoById(todo.id, {
      text: todo.editText,
      editText: ''
    });
    return updatedTodo;
  }
}

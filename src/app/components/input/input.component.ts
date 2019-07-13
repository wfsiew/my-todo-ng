import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  mform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.mform = this.fb.group(
      {
        todo: ['', Validators.required]
      }
    );
  }

  addTodo(event) {
    this.todoService.addTodo(new Todo({
      text: this.f.todo.value,
      completed: false 
    }));
    this.clearInput();
  }

  clearInput() {
    this.mform.patchValue({ todo: '' });
  }

  setTouched() {
    this.mform.markAsTouched();
  }

  get f() {
    return this.mform.controls;
  }

  get invalidTodo() {
    const b = this.mform.invalid || this.mform.untouched;
    return b;
  }
}

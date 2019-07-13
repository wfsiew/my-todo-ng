export class Todo {
  id: number;
  text: string = '';
  completed: boolean = false;
  editText: string = '';
  isEdit: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
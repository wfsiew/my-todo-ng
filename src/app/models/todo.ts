export class Todo {
  id: number;
  title: string = '';
  completed: boolean = false;
  editTitle: string = '';
  isEdit: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
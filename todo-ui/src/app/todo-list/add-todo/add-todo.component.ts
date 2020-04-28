/* Framework */
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToDoListService } from '../services/todo-list.service';
import { ToDo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  public saved$: EventEmitter<any> = new EventEmitter<any>();
  public todoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _todoListService: ToDoListService
  ) {}

  ngOnInit(): void {
    this.todoForm = this._buildForm();
  }

  private _buildForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  public close(): void {
    this._dialog.closeAll();
  }

  public save(): void {
    const todo = this.todoForm.value as ToDo;
    this._todoListService.create(todo).subscribe((data: ToDo) => {
      this.saved$.emit(data);
      this._dialog.closeAll();
    });
  }
}

/* Framework */
import { Component, OnInit, OnDestroy } from '@angular/core';

/* Internal */
import { ToDo } from '../models/todo.model';
import { ToDoListService } from './services/todo-list.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from './add-todo/add-todo.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  public todos: ToDo[] = [];

  public displayedColumns: string[] = ['title', 'isDone'];

  constructor(private _listService: ToDoListService, private _dialog: MatDialog) {}

  public ngOnInit(): void {
    this._getAndSortToDos();
  }

  public completeToDo(todoId: string): void {
    this._listService.complete(todoId).subscribe((soimething: any) => {
      this._getAndSortToDos()     
    });
  }

  public openAddDialog(): void {
    let dialogRef = this._dialog.open(AddTodoComponent);
    dialogRef.componentInstance.saved$.subscribe((data: ToDo) => {
      this._getAndSortToDos();
    });
  }

  private _getAndSortToDos(): void {
    this._listService.getAll().subscribe((data: ToDo[]) => {
      this.todos = data ? data.sort((a, b) => (a.priority > b.priority ? 1 : -1)) : [];
    });
  }
}

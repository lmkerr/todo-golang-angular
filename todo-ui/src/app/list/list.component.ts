/* Framework */
import { Component, OnInit, OnDestroy } from '@angular/core';

/* Internal */
import { ToDo } from '../models/todo.model';
import { ListService } from './services/list.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTodoComponent } from './add-todo/add-todo.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public todos: ToDo[] = [];

  public displayedColumns: string[] = ['title', 'isDone'];

  constructor(private _listService: ListService, private _dialog: MatDialog) {}

  public ngOnInit(): void {
    this._getAndSortToDos();
  }

  public completeToDo(todoId: string): void {
    this._listService.complete(todoId).subscribe((data: ToDo[]) => {
      this.todos = data.sort((a, b) => (a.priority > b.priority ? 1 : -1));
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
      this.todos = data.sort((a, b) => (a.priority > b.priority ? 1 : -1));
    });
  }
}

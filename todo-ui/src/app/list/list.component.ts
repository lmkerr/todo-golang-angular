/* Framework */
import { Component, OnInit } from '@angular/core';

/* Internal */
import { ToDo } from '../models/todo.model';
import { ListService } from './services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public todos: ToDo[] = [];

  public displayedColumns: string[] = ['priority', 'title'];

  constructor(private _listService: ListService) {}

  public ngOnInit(): void {
    this._listService.get().subscribe((todos: ToDo[]) => {
      this.todos = todos;
    });
  }
}

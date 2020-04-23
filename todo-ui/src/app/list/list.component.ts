/* Framework */
import { Component, OnInit } from '@angular/core';

/* Internal */
import { ToDo } from '../models/todo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public todos: ToDo[] = [
    { id: 1, priority: 1, isDone: false, title: 'Code Front-End' },
    { id: 2, priority: 3, isDone: false, title: 'Build Database' },
    { id: 3, priority: 5, isDone: false, title: 'Deploy Code' },
    { id: 4, priority: 2, isDone: false, title: 'Code Back-End' },
    { id: 5, priority: 4, isDone: false, title: 'Dockerize Code' },
  ];

  public displayedColumns: string[] = ['priority', 'title']

  constructor() { }


  public ngOnInit(): void {
  }
}
import { Injectable, EventEmitter } from '@angular/core';
import { ToDo } from 'src/app/models/todo.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(
    private _client: HttpClient,
    
    ) {}

  public todos$: EventEmitter<ToDo[]> = new EventEmitter<ToDo[]>();
  public todos: ToDo[] = [];

  public get(): Observable<ToDo[]> {
    return this._client.get(environment.apiBaseUrl + 'todos').pipe(
      map((response: ToDo[]) => {
        // Update todos and return;
        this.todos$.next(response);
        return response;
      })
    );
  }
}

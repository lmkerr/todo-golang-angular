import { Injectable, EventEmitter } from '@angular/core';
import { ToDo } from 'src/app/models/todo.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private _client: HttpClient) {}

  public getAll(): Observable<ToDo[]> {
    return this._client.get(environment.apiBaseUrl + 'todos').pipe(
      map((response: ToDo[]) => {
        return response;
      })
    );
  }

  public complete(todoId: string): Observable<ToDo[]> {
    return this._client
      .patch(environment.apiBaseUrl + 'todos/' + todoId, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        },
      })
      .pipe(
        map((response: ToDo[]) => {
          return response;
        })
      );
  }

  public create(todo: ToDo): Observable<ToDo> {
    return this._client.post(environment.apiBaseUrl + 'todos', todo).pipe(
      map((response: ToDo) => {
        return response;
      })
    );
  }
}

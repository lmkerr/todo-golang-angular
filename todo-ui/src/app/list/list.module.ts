/* Framework  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

/* Material */
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';


/* Internal */
import { ListComponent } from './list.component';
import { ListService } from './services/list.service';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [ListComponent, AddTodoComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    

    /* Material */
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,    
  ],
  exports: [
    ListComponent,
  ],
  providers: [
    ListService,
  ]
})
export class ListModule { }

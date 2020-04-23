/* Framework  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Material */
import { MatTableModule } from '@angular/material/table';

/* Internal */
import { ListComponent } from './list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,

    /* Material */
    MatButtonModule,
    MatIconModule,
    MatTableModule,    
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }

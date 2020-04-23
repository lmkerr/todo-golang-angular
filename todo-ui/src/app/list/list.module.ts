/* Framework  */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/* Material */
import { MatTableModule } from '@angular/material/table';

/* Internal */
import { ListComponent } from './list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListService } from './services/list.service';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    HttpClientModule,

    /* Material */
    MatButtonModule,
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

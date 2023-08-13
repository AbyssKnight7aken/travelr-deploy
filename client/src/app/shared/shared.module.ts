import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    LoaderComponent,
    CardComponent,
    PaginationComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    CardComponent,
    PaginationComponent,
    ModalComponent
  ]
})
export class SharedModule { }

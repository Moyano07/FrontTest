import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputErrorComponent } from './components/input-error/input-error.component';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [
    InputErrorComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

  ],
  
  exports: [
    ReactiveFormsModule,
    RouterModule,
    InputErrorComponent,
    SpinnerComponent
  ],
  providers: [DatePipe]
})
export class SharedModule {}

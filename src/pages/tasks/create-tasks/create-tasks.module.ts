import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTasksRoutingModule } from './create-tasks-routing.module';
import { CreateTasksComponent } from './create-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CreateTasksComponent],
  imports: [
    CommonModule,
    CreateTasksRoutingModule,
    FormsModule, ReactiveFormsModule, SharedModule
  ]
})
export class CreateTasksModule { }

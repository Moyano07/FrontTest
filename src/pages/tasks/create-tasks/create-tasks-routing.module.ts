import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTasksComponent } from './create-tasks.component';

const routes: Routes = [{ path: '', component: CreateTasksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTasksRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { ListComponent } from './list/list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [TaskComponent, ListComponent, TaskFormComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }

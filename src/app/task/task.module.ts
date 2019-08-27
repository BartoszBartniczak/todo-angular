import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { ListComponent } from './list/list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatInputModule, MatTableModule} from '@angular/material';
import {AppModule} from '../app.module';

@NgModule({
  declarations: [TaskComponent, ListComponent, TaskFormComponent],
    imports: [
        CommonModule,
        TaskRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatChipsModule,
    ]
})
export class TaskModule { }

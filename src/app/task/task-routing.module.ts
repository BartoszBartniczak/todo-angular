import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TaskComponent} from './task.component';
import {ListComponent} from './list/list.component';
import {TaskFormComponent} from './task-form/task-form.component';
import {TaskResolver} from './task.resolver';

const routes: Routes = [
    {
        path: '', component: TaskComponent,
        children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: ListComponent},

        ]
    },
    {
        path: 'form/:id',
        component: TaskFormComponent,
        resolve: {task: TaskResolver}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule {
}

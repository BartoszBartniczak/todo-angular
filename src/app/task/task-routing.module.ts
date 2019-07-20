import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TaskComponent} from './task.component';
import {ListComponent} from './list/list.component';

const routes: Routes = [
    {
        path: '', component: TaskComponent,
        children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: ListComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaskRoutingModule {
}

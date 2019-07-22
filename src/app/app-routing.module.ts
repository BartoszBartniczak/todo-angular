import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [
    {path: '', redirectTo: 'task', pathMatch: 'full'},
    {path: 'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule)},
    {path: '**', component: ErrorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

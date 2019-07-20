import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [
    {path: '', redirectTo: 'tasks', pathMatch: 'full'},
    {path: 'tasks', loadChildren: () => import('./task/task.module').then(m => m.TaskModule)},
    {path: '**', component: ErrorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

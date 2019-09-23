import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorComponent} from './error/error.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'task', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule), canActivate: [AuthGuard]},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]},
  {path: 'login', component: AuthComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

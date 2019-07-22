import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Task} from './task';
import {TaskService} from './task.service';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TaskResolver implements Resolve<Task> {

    constructor(private taskService: TaskService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task> {
        if (route.params.id === 'new') {
            return of(new Task());
        } else {
            return this.taskService.getTask(route.params.id);
        }
    }


}

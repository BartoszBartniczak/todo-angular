import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {Observable} from 'rxjs';
import {Task} from '../task';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    private tasks: Observable<Task[]>;
    private tasksCounter: Observable<number>;
    displayedColumns: string[] = ['id', 'title', 'edit-button'];

    constructor(
        private taskService: TaskService
    ) {
    }

    ngOnInit() {
        this.tasks = this.taskService.getTasks();
        this.tasksCounter = this.tasks.pipe(
            map((tasks) => tasks.length)
        );
    }

}

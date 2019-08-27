import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../task';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    tasks: Task[] = [];
    tasksCounter: number;
    displayedColumns: string[] = ['id', 'title', 'status', 'edit-button'];

    constructor(
        private taskService: TaskService
    ) {
    }

    ngOnInit() {
        this.taskService.getTasks().subscribe({
            next: (tasks) => {
                this.tasks = tasks;
                this.tasksCounter = tasks.length;
            },
            error: err => alert('Cannot load tasks')
        });
    }

}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Task, TaskAttributes} from '../task';
import {Status, StatusEnum} from '../../status/status';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
    form: FormGroup;
    private task: Task;
    public statusEnum = StatusEnum;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.data.pipe(
            map((data) => data.task)
        )
            .subscribe((task) => {
                this.form = new FormGroup({
                    id: new FormControl(task.id),
                    title: new FormControl(task.title),
                    description: new FormControl(task.description)
                });

                this.task = task;
            });
    }

    save() {
        const taskAttributes: TaskAttributes = this.form.value;

        this.taskService.saveTask(taskAttributes).subscribe(
            () => this.router.navigate(['../..'], {relativeTo: this.route}),
        );
    }


    isButtonDisabled(status: Status, buttonStatus: StatusEnum): boolean {
        switch (buttonStatus) {
            case StatusEnum.TO_DO:
                return true;
            case StatusEnum.IN_PROGRESS:
                return status.status !== StatusEnum.TO_DO;
            case StatusEnum.DONE:
                return status.status !== StatusEnum.IN_PROGRESS;
        }
    }


    resolveButtonColor(status: Status, buttonStatus: StatusEnum) {
        if (status.status === buttonStatus) {
            return 'accent';
        }
        return null;
    }

    changeStatus(task: Task, newStatus: StatusEnum) {
        this.taskService.changeStatus(task, newStatus).subscribe(
            (data: TaskAttributes) => {
                this.task = new Task(data);
            },
            () => console.log('Cannot change status.'), // TODO
        )
        ;
        return false;
    }
}

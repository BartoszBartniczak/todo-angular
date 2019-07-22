import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {TaskAttributes} from '../task';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
    form: FormGroup;

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
            });
    }

    save() {
        const taskAttributes: TaskAttributes = this.form.value;

        this.taskService.saveTask(taskAttributes).subscribe(
            () => this.router.navigate(['../..'], {relativeTo: this.route}),
        );
    }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../task';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  tasksCounter: number;
  displayedColumns: string[] = ['id', 'title', 'status', 'edit-button'];

  private tasksSubscription: Subscription;

  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
    this.tasksSubscription = this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.tasksCounter = tasks.length;
      },
      error: err => alert('Cannot load tasks')
    });
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }

}

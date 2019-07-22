import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Task, TaskAttributes} from './task';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private apiUrl: string = environment.apiUrl;

    tasks = new BehaviorSubject<Task[]>([]);

    constructor(private httpClient: HttpClient) {
    }

    saveTask(data: TaskAttributes): Observable<Task> {
        if (data.id) {
            return this.httpClient.put<TaskAttributes>(`${this.apiUrl}/tasks/${data.id}`, data).pipe(
                map((taskAttributes: TaskAttributes) => new Task(taskAttributes))
            );
        } else {
            return this.httpClient.post<TaskAttributes>(`${this.apiUrl}/tasks`, data).pipe(
                map((taskAttributes: TaskAttributes) => new Task(taskAttributes))
            );
        }
    }

    getTask(id: string): Observable<Task> {
        return this.httpClient.get<TaskAttributes>(`${this.apiUrl}/tasks/${id}`).pipe(
            map((taskAttributes: TaskAttributes) => new Task(taskAttributes))
        );
    }

    getTasks(): Observable<Task[]> {
        return this.httpClient.get<TaskAttributes[]>(`${this.apiUrl}/tasks`).pipe(
            map((data) => data.map(taskAttributes => new Task(taskAttributes)))
        );
    }
}

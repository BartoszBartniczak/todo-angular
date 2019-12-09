import {inject, TestBed} from '@angular/core/testing';

import {TaskService} from './task.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {Task} from './task';
import {StatusEnum} from '../status/status';

describe('TaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TaskService
    ],
    imports: [
      HttpClientTestingModule
    ]
  }));

  afterEach(
    inject([HttpTestingController], (httpClientMock: HttpTestingController) => {
        httpClientMock.verify();
      }
    )
  );

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  // tslint:disable-next-line:max-line-length
  it('should get tasks from API', inject([HttpTestingController, TaskService], (httpClientMock: HttpTestingController, taskService: TaskService) => {
    taskService.getTasks().subscribe((data) => {
      expect(data.length).toEqual(3);
      expect(data[0] instanceof Task).toBeTruthy();
    });

    const request = httpClientMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(request.request.method).toBe('GET');

    request.flush([
      {
        id: '8af2a341-c312-4b1e-8acb-22aac5657ce6',
        title: 'Rabbit began. Alice thought she had never been.',
        // tslint:disable-next-line:max-line-length
        description: 'Lastly, she pictured to herself \'That\'s quite enough--I hope I shan\'t go, at any rate I\'ll never go THERE again!\' said Alice very humbly: \'you had got to the porpoise, "Keep back, please: we don\'t want YOU with us!"\' \'They were obliged to write with one eye, How the Owl and the others took the.',
        status: {
          id: 'IN_PROGRESS'
        }
      },
      {
        id: '571fe5fb-4fdc-47e6-9e06-659d18c85887',
        title: 'Pigeon; \'but I must be what he did it,) he did.',
        // tslint:disable-next-line:max-line-length
        description: 'I\'ve got to the beginning again?\' Alice ventured to ask. \'Suppose we change the subject,\' the March Hare. Visit either you like: they\'re both mad.\' \'But I don\'t like it, yer honour, at all, as the Lory positively refused to tell me who YOU are, first.\' \'Why?\' said the Mock Turtle at last, and.',
        status: {
          id: 'DONE'
        }
      },
      {
        id: '7bcbf3e3-c371-4793-b020-19bd29f029d1',
        title: 'I should understand that better,\' Alice said',
        // tslint:disable-next-line:max-line-length
        description: 'Gryphon only answered \'Come on!\' cried the Mouse, who was a little startled by seeing the Cheshire Cat sitting on a three-legged stool in the distance, screaming with passion. She had not gone far before they saw her, they hurried back to the Queen, but she gained courage as she could not remember.',
        status: {
          id: 'TO_DO'
        }
      }
    ])
    ;
  }));

  // tslint:disable-next-line:max-line-length
  it('should get Task from API', inject([HttpTestingController, TaskService], (httpClientMock: HttpTestingController, taskService: TaskService) => {
      taskService.getTask('7bcbf3e3-c371-4793-b020-19bd29f029d1').subscribe(
        (data) => {
          expect(data instanceof Task).toBeTruthy();
        }
      );

      const request = httpClientMock.expectOne(`${environment.apiUrl}/tasks/7bcbf3e3-c371-4793-b020-19bd29f029d1`);
      expect(request.request.method).toBe('GET');

      request.flush({
        id: '7bcbf3e3-c371-4793-b020-19bd29f029d1',
        title: 'I should understand that better,\' Alice said',
        // tslint:disable-next-line:max-line-length
        description: 'Gryphon only answered \'Come on!\' cried the Mouse, who was a little startled by seeing the Cheshire Cat sitting on a three-legged stool in the distance, screaming with passion. She had not gone far before they saw her, they hurried back to the Queen, but she gained courage as she could not remember.',
        status: {
          id: 'TO_DO'
        }
      });
    }
  ));

  // tslint:disable-next-line:max-line-length
  it('should change status', inject([HttpTestingController, TaskService], (httpClientMock: HttpTestingController, taskService: TaskService) => {

    const task = new Task({
      id: '7bcbf3e3-c371-4793-b020-19bd29f029d1',
      title: 'I should understand that better,\' Alice said',
      // tslint:disable-next-line:max-line-length
      description: 'Gryphon only answered \'Come on!\' cried the Mouse, who was a little startled by seeing the Cheshire Cat sitting on a three-legged stool in the distance, screaming with passion. She had not gone far before they saw her, they hurried back to the Queen, but she gained courage as she could not remember.',
      status: {
        id: 'TO_DO'
      }
    });

    taskService.changeStatus(task, StatusEnum.IN_PROGRESS).subscribe(
      (data) => {
        expect(data instanceof Task).toBeTruthy();
        expect(data.status.status === StatusEnum.IN_PROGRESS).toBeTruthy();
      }
    );

    // tslint:disable-next-line:max-line-length
    const request = httpClientMock.expectOne(`${environment.apiUrl}/tasks/7bcbf3e3-c371-4793-b020-19bd29f029d1/status/${StatusEnum.IN_PROGRESS}`);
    expect(request.request.method).toBe('PUT');

    request.flush({
      id: '7bcbf3e3-c371-4793-b020-19bd29f029d1',
      title: 'I should understand that better,\' Alice said',
      // tslint:disable-next-line:max-line-length
      description: 'Gryphon only answered \'Come on!\' cried the Mouse, who was a little startled by seeing the Cheshire Cat sitting on a three-legged stool in the distance, screaming with passion. She had not gone far before they saw her, they hurried back to the Queen, but she gained courage as she could not remember.',
      status: {
        id: 'IN_PROGRESS'
      }
    });

  }));

  // tslint:disable-next-line:max-line-length
  it('should create new tasks', inject([HttpTestingController, TaskService], (httpClientMock: HttpTestingController, taskService: TaskService) => {

    const task = new Task({
      title: 'I should understand that better,\' Alice said',
      // tslint:disable-next-line:max-line-length
      description: 'Gryphon only answered \'Come on!\' cried the Mouse, who was a little startled by seeing the Cheshire Cat sitting on a three-legged stool in the distance, screaming with passion. She had not gone far before they saw her, they hurried back to the Queen, but she gained courage as she could not remember.',
      status: {
        id: 'TO_DO'
      }
    });

    taskService.saveTask(task).subscribe(
      (data) => {
        expect(data instanceof Task).toBeTruthy();
        expect(data.id).toBe('7bcbf3e3-c371-4793-b020-19bd29f029d1');
      }
    );

    const request = httpClientMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(request.request.method).toBe('POST');

    request.flush({
      id: '7bcbf3e3-c371-4793-b020-19bd29f029d1',
      title: 'I should understand that better,\' Alice said',
      // tslint:disable-next-line:max-line-length
      description: 'Gryphon only answered \'Come on!\' cried the Mouse, who was a little startled by seeing the Cheshire Cat sitting on a three-legged stool in the distance, screaming with passion. She had not gone far before they saw her, they hurried back to the Queen, but she gained courage as she could not remember.',
      status: {
        id: 'TO_DO'
      }
    });

  }));

  // tslint:disable-next-line:max-line-length
  it('should update existing task', inject([HttpTestingController, TaskService], (httpClientMock: HttpTestingController, taskService: TaskService) => {

    const task = new Task({
      id: '7bcbf3e3-c371-4793-b020-19bd29f029d1',
      title: 'Lorem ipsum dolor sit amet.',
      // tslint:disable-next-line:max-line-length
      description: 'Gryphon only answered \'Come on!\' cried the Mouse, who was a little startled by seeing the Cheshire Cat sitting on a three-legged stool in the distance, screaming with passion. She had not gone far before they saw her, they hurried back to the Queen, but she gained courage as she could not remember.',
      status: {
        id: 'TO_DO'
      }
    });

    taskService.saveTask(task).subscribe(
      (data) => {
        expect(data instanceof Task).toBeTruthy();
      }
    );

    const request = httpClientMock.expectOne(`${environment.apiUrl}/tasks/7bcbf3e3-c371-4793-b020-19bd29f029d1`);
    expect(request.request.method).toBe('PUT');

    request.flush({
      id: '7bcbf3e3-c371-4793-b020-19bd29f029d1',
      title: 'Lorem ipsum dolor sit amet.',
      // tslint:disable-next-line:max-line-length
      description: 'Gryphon only answered \'Come on!\' cried the Mouse, who was a little startled by seeing the Cheshire Cat sitting on a three-legged stool in the distance, screaming with passion. She had not gone far before they saw her, they hurried back to the Queen, but she gained courage as she could not remember.',
      status: {
        id: 'TO_DO'
      }
    });

  }));


});

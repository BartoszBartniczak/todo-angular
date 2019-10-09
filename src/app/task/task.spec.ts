import {Task} from './task';
import {Status, StatusEnum} from '../status/status';

describe('Task', () => {

  it('should create valid object', () => {
    const task = new Task({
      id: 'bc581c1f-45c9-4f0a-ac40-98cc871367d1',
      title: 'test title',
      description: 'test description',
      status: {
        id: StatusEnum.TO_DO
      }
    });

    expect(task).toBeTruthy();
    expect(task.id).toBe('bc581c1f-45c9-4f0a-ac40-98cc871367d1');
    expect(task.title).toBe('test title');
    expect(task.description).toBe('test description');
    expect(task.status).toEqual(new Status({id: StatusEnum.TO_DO}));
  });

});

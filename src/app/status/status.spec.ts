import {Status, StatusEnum} from './status';

describe('Status', () => {
  it('should create an instance', () => {
    expect(new Status()).toBeTruthy();
  });

  it('should create valid status enum', () => {
    const todo = new Status({id: StatusEnum.TO_DO});
    expect(todo.status === StatusEnum.TO_DO).toBeTruthy();
  });

  it('should return null as a color for TODO', () => {
    const todo = new Status({id: StatusEnum.TO_DO});
    expect(todo.color()).toBeNull();
  });

  it('should return accent as a color for IN_PROGRESS', () => {
    const inProgress = new Status({id: StatusEnum.IN_PROGRESS});
    expect(inProgress.color()).toBe('accent');
  });

  it('should return primary as a color for DONE', () => {
    const done = new Status({id: StatusEnum.DONE});
    expect(done.color()).toBe('primary');
  });

  it('TODO should not be selected', () => {
    const todo = new Status({id: StatusEnum.TO_DO});
    expect(todo.isSelected()).toBeFalsy();
  });

  it('IN_PROGRESS should be selected', () => {
    const inProgress = new Status({id: StatusEnum.IN_PROGRESS});
    expect(inProgress.isSelected()).toBeTruthy();
  });

  it('DONE should be selected', () => {
    const done = new Status({id: StatusEnum.DONE});
    expect(done.isSelected()).toBeTruthy();
  });

  it('should return valid titles', () => {
    const todo = new Status({id: StatusEnum.TO_DO});
    expect(todo.title()).toBe('TO DO');

    const inProgress = new Status({id: StatusEnum.IN_PROGRESS});
    expect(inProgress.title()).toBe('IN PROGRESS');

    const done = new Status({id: StatusEnum.DONE});
    expect(done.title()).toBe('DONE');
  });

});

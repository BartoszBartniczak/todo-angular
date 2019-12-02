import { TestBed, async, inject } from '@angular/core/testing';

import {AuthGuard} from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });

  it('should pass when user is logged in', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();


    //TODO get auth service
  }));

  // it('')
});

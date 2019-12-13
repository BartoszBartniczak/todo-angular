import {TestBed, inject, getTestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {JwtHelperService} from '@auth0/angular-jwt';

describe('AuthGuard', () => {

  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };
  let authService: AuthService;
  const activatedRouteMock: any = {snapshot: {}};
  const routeStateMock: any = {snapshot: {}, url: '/task/list'};
  const jwtHelperServiceMock: any = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: Router, useValue: routerMock},
        {provide: JwtHelperService, useValue: jwtHelperServiceMock},
        AuthService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    authService = getTestBed().get(AuthService);
  });

  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should pass when user is logged in',
    inject([AuthGuard], (guard: AuthGuard) => {

      spyOn(authService, 'isUserLoggedIn').and.returnValue(true);
      expect(guard.canActivate(activatedRouteMock, routeStateMock)).toBeTruthy();

    }));

  it('should redirect unauthenticated user to login page with redirect url',
    inject([AuthGuard, Router], (guard: AuthGuard) => {

      spyOn(authService, 'isUserLoggedIn').and.returnValue(false);
      expect(guard.canActivate(activatedRouteMock, routeStateMock)).toBeFalsy();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/login'], {queryParams: {returnUrl: '/task/list'}});

    })
  );



});

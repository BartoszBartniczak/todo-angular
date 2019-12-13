import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {JwtHelperService} from '@auth0/angular-jwt';

describe('AuthService', () => {
  const jwtHelperServiceMock: any = {
    isTokenExpired: jasmine.createSpy('isTokenExpired')
  };

  beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          {provide: JwtHelperService, useValue: jwtHelperServiceMock}
        ],
        imports: [
          HttpClientTestingModule
        ]
      });

      let store = {};
      const mockLocalStorage = {
        getItem: (key: string): string => {
          return key in store ? store[key] : null;
        },
        setItem: (key: string, value: string) => {
          store[key] = `${value}`;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        }
      };

      spyOn(localStorage, 'getItem')
        .and.callFake(mockLocalStorage.getItem);
      spyOn(localStorage, 'setItem')
        .and.callFake(mockLocalStorage.setItem);
      spyOn(localStorage, 'removeItem')
        .and.callFake(mockLocalStorage.removeItem);
      spyOn(localStorage, 'clear')
        .and.callFake(mockLocalStorage.clear);

    }
  );

  it('should be created', inject([AuthService], (authService: AuthService) => {
    expect(authService).toBeTruthy();
  }));

  it('should save and return token in local storage',
    () => {

      AuthService.setAuthToken('testToken');
      // TODO check if localStorage method is called

      expect(AuthService.getAuthToken()).toBe('testToken');
      // TODO check if localStorage method is called

    });

  describe('isUserLoggedIn', () => {

    it('should return false if jwtHelper method isTokenExpired returns true',
      inject([AuthService], (authService: AuthService) => {

        jwtHelperServiceMock.isTokenExpired.and.callFake(() => true);

        expect(authService.isUserLoggedIn()).toBeFalsy();

      })
    );

    it('should return true if jwtHelper method isTokenExpired returns false',
      inject([AuthService], (authService: AuthService) => {

        jwtHelperServiceMock.isTokenExpired.and.callFake(() => false);

        expect(authService.isUserLoggedIn()).toBeTruthy();

      })
    );

  });

});

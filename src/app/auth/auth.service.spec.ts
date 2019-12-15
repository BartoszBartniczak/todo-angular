import {inject, TestBed} from '@angular/core/testing';

import {AuthService, JwtResponse} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {JwtHelperService} from '@auth0/angular-jwt';
import Spy = jasmine.Spy;
import {environment} from '../../environments/environment';

describe('AuthService', () => {
  const jwtHelperServiceMock: any = {
    isTokenExpired: jasmine.createSpy('isTokenExpired')
  };

  let getItemSpy: Spy;
  let setItemSpy: Spy;
  let removeItemSpy: Spy;

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

      getItemSpy = spyOn(localStorage, 'getItem')
        .and.callFake(mockLocalStorage.getItem);
      setItemSpy = spyOn(localStorage, 'setItem')
        .and.callFake(mockLocalStorage.setItem);
      removeItemSpy = spyOn(localStorage, 'removeItem')
        .and.callFake(mockLocalStorage.removeItem);
      spyOn(localStorage, 'clear')
        .and.callFake(mockLocalStorage.clear);

    }
  );

  it('should be created', inject([AuthService], (authService: AuthService) => {
    expect(authService).toBeTruthy();
  }));


  describe('setAuthToken', () => {
    it('should save token in localStorage',
      () => {
        AuthService.setAuthToken('testToken');
        expect(setItemSpy.calls.count()).toBe(1);
        expect(setItemSpy.calls.argsFor(0)).toEqual([AuthService.ACCESS_TOKEN_KEY, 'testToken']);
      });
  });

  describe('getAuthToken', () => {
    it('should return token from localStorage', () => {
      getItemSpy.and.returnValue('testToken');

      expect(AuthService.getAuthToken()).toBe('testToken');
      expect(getItemSpy.calls.count()).toBe(1);
      expect(getItemSpy.calls.argsFor(0)).toEqual([AuthService.ACCESS_TOKEN_KEY]);
    });
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

  describe('logout', () => {

    it('should remove token from localStorage',
      inject([AuthService], (authService: AuthService) => {

        authService.logout();
        expect(removeItemSpy.calls.count()).toBe(1);
        expect(removeItemSpy.calls.argsFor(0)).toEqual([AuthService.ACCESS_TOKEN_KEY]);

      }));
  });

  describe('login', () => {

    it('should return observable JwtResponse',
      inject(
        [HttpTestingController, AuthService],
        (httpClientMock: HttpTestingController, authService: AuthService) => {

        authService.login('login', 'password').subscribe(
          (jwtResponse) => {
            // tslint:disable-next-line:max-line-length
            expect(jwtResponse.token).toBe('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzY0MjY2NDYsImV4cCI6MTU3NjQzMDI0Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlciJ9.Hz8BBy6vCI7ZafQum5K6jfXMo-MuLgVB7UpnBJ4vFaWOFAWEv95lLqVicAegAfzdrtzaUjBGpM6cBBM0tJ9zTlxKWavCKr5tGZFm47y_U9QTJejkD_sI1LGD0oP3k0aL9fpBEV_fdarInPigRmTSvs8oW0z97TzCbfnwg1pZyU0wJRQmD9SoqvQbbLZyjVpylGUlwEftYZaoiRRiBMCl9VN0iavm1VovVFE-8jt7TvOuJSxeYJg-Xr1w2i7R0D5w_CVUv5N8k49LClsBS2w5Q5jTfQDqa_7vHh-X_JEg6t5m51lQ6bIpv0ivA8O8h3qZvbXIPjQlS6Lpo9AeYGEPjXuhD4OeZXzCk7-dZIUbJptxOD5Nnpwszmz1LCmP1OMwhDzH0X1bkJfdRMgSyz1uuLPt6P3x_Aa-WI8qZR2nixoXcuzIAXdUdwNaa5vZKCrZZ-R2-mT0lSLYXEyXDErzhPs5TGP4K8nJRl1DOJDP5-mrLrjy8Mfda3-8E8EDr-6yv6XAMip9kq8BEqE8Ku7K5TBhfcMnirSynJJWID-VnA_aHG7eiF7e6Y682cUXcWKhPn9uYoqa-rHbZm75EFt7wA3-dW7abEkBdHB1X_dwcwKqs8nj7NGFOmFqjZuCnuJJpToGW3zZpW5poQbcRRL5ltA2DJmGZ8dWqRwjGx6lrds');
          }
        );

        const request = httpClientMock.expectOne(`${environment.apiUrl}/login_check`);
        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual({
          username: 'login',
          password: 'password'
        });

        request.flush({
          // tslint:disable-next-line:max-line-length
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzY0MjY2NDYsImV4cCI6MTU3NjQzMDI0Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidXNlciJ9.Hz8BBy6vCI7ZafQum5K6jfXMo-MuLgVB7UpnBJ4vFaWOFAWEv95lLqVicAegAfzdrtzaUjBGpM6cBBM0tJ9zTlxKWavCKr5tGZFm47y_U9QTJejkD_sI1LGD0oP3k0aL9fpBEV_fdarInPigRmTSvs8oW0z97TzCbfnwg1pZyU0wJRQmD9SoqvQbbLZyjVpylGUlwEftYZaoiRRiBMCl9VN0iavm1VovVFE-8jt7TvOuJSxeYJg-Xr1w2i7R0D5w_CVUv5N8k49LClsBS2w5Q5jTfQDqa_7vHh-X_JEg6t5m51lQ6bIpv0ivA8O8h3qZvbXIPjQlS6Lpo9AeYGEPjXuhD4OeZXzCk7-dZIUbJptxOD5Nnpwszmz1LCmP1OMwhDzH0X1bkJfdRMgSyz1uuLPt6P3x_Aa-WI8qZR2nixoXcuzIAXdUdwNaa5vZKCrZZ-R2-mT0lSLYXEyXDErzhPs5TGP4K8nJRl1DOJDP5-mrLrjy8Mfda3-8E8EDr-6yv6XAMip9kq8BEqE8Ku7K5TBhfcMnirSynJJWID-VnA_aHG7eiF7e6Y682cUXcWKhPn9uYoqa-rHbZm75EFt7wA3-dW7abEkBdHB1X_dwcwKqs8nj7NGFOmFqjZuCnuJJpToGW3zZpW5poQbcRRL5ltA2DJmGZ8dWqRwjGx6lrds'
        });

      })
    );

  });

});

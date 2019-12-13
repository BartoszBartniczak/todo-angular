import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

export interface JwtResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) {
  }

  static readonly ACCESS_TOKEN_KEY = 'access_token';


  private apiUrl: string = environment.apiUrl;

  static setAuthToken(token: string) {
    localStorage.setItem(AuthService.ACCESS_TOKEN_KEY, token);
  }

  static getAuthToken(): string {
    return localStorage.getItem(AuthService.ACCESS_TOKEN_KEY);
  }

  isUserLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired(AuthService.getAuthToken());
  }

  login(username: string, password: string): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.apiUrl}/login_check`, {username, password}).pipe(
      map((jwtResponse: JwtResponse) => jwtResponse)
    );
  }

  logout(): void {
    localStorage.removeItem(AuthService.ACCESS_TOKEN_KEY);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface JwtResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  static readonly ACCESS_TOKEN_KEY = 'access_token';

  private apiUrl: string = environment.apiUrl;

  static setAuthToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  static getAuthToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  login(username: string, password: string): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.apiUrl}/login_check`, {username, password}).pipe(
      map((jwtResponse: JwtResponse) => jwtResponse)
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService, JwtResponse} from '../auth.service';

interface UserCredentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService
  ) {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }

  login() {
    const userCredentials: UserCredentials = this.form.value;
    this.authService.login(userCredentials.username, userCredentials.password).subscribe(
      (response: JwtResponse) => {
        AuthService.setAuthToken(response.token);
        console.log('Login successful'); // TODO to Main page or to returnUrl
      },
      (error) => {
        console.log('Wrong login', error); // TODO Error
      }
    );
  }
}

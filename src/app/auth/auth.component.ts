import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, JwtResponse} from './auth.service';

interface UserCredentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  hide = true;
  private wrongCredentials: boolean;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    this.wrongCredentials = false;
  }

  login() {
    const userCredentials: UserCredentials = this.form.value;
    this.authService.login(userCredentials.username, userCredentials.password).subscribe(
      (response: JwtResponse) => {
        AuthService.setAuthToken(response.token);

        if (this.activatedRoute.snapshot.queryParams.returnUrl === undefined) {
          return this.router.navigate(['/']);
        } else {
          return this.router.navigate([this.activatedRoute.snapshot.queryParams.returnUrl]);
        }

      },
      (error) => {
        this.wrongCredentials = true;
      }
    );
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService, JwtResponse} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

interface UserCredentials {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  hide = true;
  private wrongCredentials: boolean;
  private loginSubscription: Subscription;

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
    this.loginSubscription = this.authService.login(userCredentials.username, userCredentials.password).subscribe(
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

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}

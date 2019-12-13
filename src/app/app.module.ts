import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TaskModule} from './task/task.module';
import {ErrorComponent} from './error/error.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {AuthService} from './auth/auth.service';
import {AuthModule} from './auth/auth.module';

export function jwtOptionsFactory() {
    return {
      tokenGetter: () => {
        return AuthService.getAuthToken();
      },
      whitelistedDomains: [environment.apiDomain],
      blacklistedRoutes: [
        `${environment.apiDomain}/login_check`,
      ],
    };
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    MainMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaskModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      }
    }),
    AuthModule,
  ],
  providers: [AuthService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

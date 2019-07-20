import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TaskModule} from './task/task.module';
import { ErrorComponent } from './error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TaskModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

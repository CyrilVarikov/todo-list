import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppRoutesModule} from "./app.routes.module";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {JwtModule} from "@auth0/angular-jwt";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from './auth/service/token.interceptor';

import {SERVER} from '../config/local.env.config';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: `${SERVER.protocol}${SERVER.origin}:${SERVER.port}`, options: {} };

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegistrationComponent } from './auth/components/registration/registration.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { TaskListComponent } from './task/components/task-list/task-list.component';
import { TaskComponent } from './task/components/task/task.component';
import {AuthService} from "./auth/service/auth.service";
import {TaskService} from "./task/service/task.service";
import { NewTaskComponent } from './task/components/new-task/new-task.component';
import {AuthGuardHelper} from "./auth/helpers/auth-guard.helper";
import {AuthHelper} from "./auth/helpers/auth.helper";
import { EditTaskComponent } from './task/components/edit-task/edit-task.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    TaskListComponent,
    TaskComponent,
    NewTaskComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        whitelistedDomains: ['localhost:4200', 'localhost:3000']
      }
    }),
    SocketIoModule.forRoot(config),
    NgbModule,
    GraphQLModule
  ],
  providers: [
    AuthService,
    TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuardHelper,
    AuthHelper
  ],
  bootstrap: [AppComponent],
  exports: [HttpClientModule]
})
export class AppModule {}

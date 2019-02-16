import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./auth/components/login/login.component";
import { RegistrationComponent } from "./auth/components/registration/registration.component";
import {TaskListComponent} from "./task/components/task-list/task-list.component";
import {NewTaskComponent} from "./task/components/new-task/new-task.component";

import { AuthGuardHelper} from "./auth/helpers/auth-guard.helper";
import {EditTaskComponent} from "./task/components/edit-task/edit-task.component";


//TODO need to change login on home path
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent},
  { path: 'home', component: TaskListComponent, canActivate: [AuthGuardHelper] },
  { path: 'addTask', component: NewTaskComponent, canActivate: [AuthGuardHelper]},
  { path: 'edit/:id', component: EditTaskComponent, canActivate: [AuthGuardHelper]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutesModule {}

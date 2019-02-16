import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthGuardHelper implements CanActivate {
  constructor(public auth: AuthHelper, public router: Router) {}

  public canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

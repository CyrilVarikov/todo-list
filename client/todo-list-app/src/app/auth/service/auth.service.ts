import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SERVER} from '../../../config/local.env.config';
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  private BASE_URL : string = `${SERVER.protocol}${SERVER.origin}:${SERVER.port}/api/users`;

  public signUp(user) {
    return this.http.post(`${this.BASE_URL}/signup`, user);
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  public login(creds) {
    return this.http.post(`${this.BASE_URL}/login`, creds)
    .subscribe(data => {
      if(data['token']) {
        this.saveToken(data['token']);
      }
      this.router.navigate(['/home']);
    })
  }
}

import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/User.model';
import { TokenService } from 'src/app/services/token/token.service';

interface ResponseLogin {
  error: string;
  token: string;
  result: {
    token: string;
    user: UserModel;
    permission: string[];
    role: string;
  };
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}
  user = {
    id: 0,
    username: '',
    role: '',
    email: '',
    nit: '',
  };

  role = 'none';

  login(nit: string, password: string) {
    return this.http
      .post(`${environment.url}/authenticate`, {
        username: nit,
        password: password,
      })
      .pipe(
        tap((response: any) => {
          this.tokenService.saveToken(response.token);
        })
      );
  }                                    

  createUser(user: UserModel) {
    return this.http.post(`${environment.url}/user`, user);
  }

  logout() {
    this.user = {
      id: 0,
      username: '',
      role: '',
      email: '',
      nit: '',
    };
    this.role = 'node';
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  hasUser() {
    return of(sessionStorage.getItem('token'));
  }

  getRole() {
    if (this.role === 'none') {
      this.role = String(sessionStorage.getItem('role'));
    }
    return this.role;
  }
  getAuth() {
    return sessionStorage.getItem('token');
  }
}

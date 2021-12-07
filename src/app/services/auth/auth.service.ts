import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/User.model';

interface ResponseLogin {
  error: string;
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
  constructor(private http: HttpClient, private router: Router) {}
  user = {
    id: 0,
    username: '',
    role: '',
    email: '',
    nit: ''
  };

  role = 'none';

  login(nit: string, password: string) {
    return this.http
      .post(
        `${environment.url}/api/authenticate`,
        {nit: nit , clave: password}
      )
      .pipe(
        tap((response: any) => {
          //this.user = response.result.user;
          //sessionStorage.setItem('token', response.result.token);
          console.log(response)
        })
      );
  }
  createUser(user: UserModel) {
    const token = sessionStorage.getItem('token');
    return this.http.post(`${environment.url}/user`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }



  logout() {
    this.user = {
      id: 0,
      username: '',
      role: '',
      email: '',
      nit: ''
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

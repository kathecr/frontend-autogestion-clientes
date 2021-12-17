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

  logout() {
    this.tokenService.removeToken();
    localStorage.removeItem('idEmpresa');
    this.saveRole('none');
    this.router.navigateByUrl('/');
  }

  saveRole(role: string) {
    this.role = role;
    localStorage.setItem('role', role);
  }

  getRole() {
    if (this.role == 'none') {
      this.role = String(localStorage.getItem('role'));
    }
    return this.role;
  }
}

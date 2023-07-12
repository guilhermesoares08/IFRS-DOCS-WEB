import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map } from 'rxjs/operators';
import { Constants } from '../util/constants';
import { Observable, throwError } from 'rxjs';
import { UserLogin } from '../models/UserLogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private httpClient: HttpClient) { }

  login(model: any): Observable<any> {
    return this.httpClient.post(`${environment.apiEndpoint}/authentication/login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem(Constants.LOGIN_TOKEN, user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          sessionStorage.setItem(Constants.USER_USERNAME, this.decodedToken.unique_name);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }));
  }

  register(model: any) {
    return this.httpClient.post(`${environment.apiEndpoint}/authentication/register`, model);
  }

  isUserLoggedIn() {
    const token = localStorage.getItem(Constants.LOGIN_TOKEN);
    if(token != null){
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;    
  }

  getParsedToken(): any{
    return this.jwtHelper.decodeToken(localStorage.getItem(Constants.LOGIN_TOKEN) || '{}');
  }

  getUserInfo(): UserLogin | null{    
    var parsedToken = this.getParsedToken();
    if(parsedToken != null){
      return new UserLogin({
        userName: parsedToken.unique_name,
        role: parsedToken.role,
        id: parsedToken.nameid
      });
    }
    return null;
  }

  isUserAdmin(): boolean{
    var currentUser = this.getUserInfo();
    return currentUser != null && currentUser.role == 'Admin';
  }

}

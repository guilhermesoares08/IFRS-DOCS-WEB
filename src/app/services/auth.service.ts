import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map } from 'rxjs/operators';
import { Constants } from '../util/constants';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'https://ifrs-docs-api.azurewebsites.net/api/authentication/';
  
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private httpClient: HttpClient) { }

  login(model: any): Observable<any> {
    return this.httpClient.post(`${this.baseURL}login`, model).pipe(
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
    return this.httpClient.post(`${this.baseURL}register`, model);
  }

  isUserLoggedIn() {
    const token = localStorage.getItem(Constants.LOGIN_TOKEN);
    if(token != null){
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;    
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Constants } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem(Constants.LOGIN_TOKEN) !== null) {
      return true;
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }
}

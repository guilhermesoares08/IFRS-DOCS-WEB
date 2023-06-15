import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/util/constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isCollapsed = true;
  constructor(public authService: AuthService
    ,         public router: Router
    ,         private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showMenu(): boolean{
    return this.router.url != '/user/login';
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  logout() {
    localStorage.removeItem(Constants.LOGIN_TOKEN);
    sessionStorage.removeItem('username');
    this.toastr.show('Log Out');
    this.router.navigate(['/user/login']);
  }

  userName() {
    return sessionStorage.getItem('username');
  }

}

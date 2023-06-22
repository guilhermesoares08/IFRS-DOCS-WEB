import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Constants } from 'src/app/util/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo = 'Login';
  model: any = {};
  validUser: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService
    ,         public router: Router
    ,         private toastr: ToastrService
    ,         private spinner: NgxSpinnerService) { }

  ngOnInit() { } 

  login() {
    let tmpModel = Object.assign({}, this.model);
    var errorMessage = "";
    this.spinner.show();
    this.isLoading = true;

    this.authService.login(tmpModel)
      .subscribe(
        () => {
          this.router.navigate(['']);
          this.toastr.success('Logado com Sucesso');
          this.isLoading = false;
        },        
        (error: any) => {
          if(error.status === HttpStatusCode.Unauthorized){
            errorMessage = "Login e/ou senha incorretos. Por favor, tente novamente."
          }
          else if (error.status === HttpStatusCode.InternalServerError){
            errorMessage = "Erro Interno da aplicação "
            errorMessage += error.message;
          }
          else{
            errorMessage = "Erro desconhecido "
            errorMessage += error.message;
          }
          this.validUser = false;
          this.toastr.error(errorMessage);
          this.isLoading = false;
        })
  }  
}

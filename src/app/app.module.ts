import { CUSTOM_ELEMENTS_SCHEMA, NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtHelperService } from '@auth0/angular-jwt';

import { RequestFormComponent } from './components/request-form/request-form.component';
import { FormsComponent } from './components/forms/forms.component';
import { NavComponent } from './components/nav/nav.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { FormGroupErrorsComponent } from './components/debug/form-group-errors/form-group-errors.component';

import { TituloComponent } from './_shared/titulo/titulo.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DateTimeFormatPipePipe } from './_helpers/FormatPipes/DateFormatPipe.pipe';

import { FormService } from './services/form.service';
import { FormDetailComponent } from './components/forms/form-detail/form-detail.component';
import { FormListComponent } from './components/forms/form-list/form-list.component';
import { environment } from 'src/environments/environment';

if(environment.production){
  enableProdMode();
}

@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
    FormsComponent,
    NavComponent,
    TituloComponent,
    DateTimeFormatPipePipe,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    FormDetailComponent,
    FormListComponent,
    FormGroupErrorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [FormService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

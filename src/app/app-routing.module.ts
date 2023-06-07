import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDetailComponent } from './components/forms/form-detail/form-detail.component';
import { FormListComponent } from './components/forms/form-list/form-list.component';
import { FormsComponent } from './components/forms/forms.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children:[
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ]
  },
  {
    path: 'forms', redirectTo: 'forms/list'
  },
  { 
    path: 'forms', component: FormsComponent,
    children:[
      { path: 'detail/:id', component: FormDetailComponent },
      { path: 'detail', component: FormDetailComponent },
      { path: 'list', component: FormListComponent }
    ]
  },
  { path: 'requestform', component: RequestFormComponent },
  { path: '',  component: FormListComponent },
  { path: '', redirectTo: 'forms/list', pathMatch: 'full' },
  { path: '**',  redirectTo: 'forms/list', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

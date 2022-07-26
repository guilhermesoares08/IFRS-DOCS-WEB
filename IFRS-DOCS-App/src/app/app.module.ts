import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { FormsComponent } from './forms/forms.component';
import { NavComponent } from './nav/nav.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TituloComponent } from './_shared/titulo/titulo.component';

import { DateTimeFormatPipePipe } from './_helpers/FormatPipes/DateFormatPipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
    FormsComponent,
    NavComponent,
    TituloComponent,
    DateTimeFormatPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


// used to create fake backend
import {  fakeBackendProvider } from './helpers/fake-data';


import { JwtInterceptor } from './helpers/interceptor';


import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } 
       from '@angular/platform-browser/animations';
import { AlertComponent } from './alert/alert.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoanComponent } from './loan/loan.component';
import { FilternlPipe } from './filternl.pipe';
import { AddNewLoanComponent } from './add-new-loan/add-new-loan.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AlertComponent,
    PagenotfoundComponent,
    LoanComponent,
    FilternlPipe,
    AddNewLoanComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule 
  
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

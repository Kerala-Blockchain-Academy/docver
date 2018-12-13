import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { RegisterComponent } from './register/register.component';
=======
import { ListofComponent } from './listof/listof.component';
>>>>>>> e4b05211b6c1df868d3e4eedaedaa6aa55e74a5c

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
<<<<<<< HEAD
    RegisterComponent
=======
    ListofComponent
>>>>>>> e4b05211b6c1df868d3e4eedaedaa6aa55e74a5c
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// <<<<<<< HEAD
import { RegisterComponent } from './register/register.component';
//=======
import { ListofComponent } from './listof/listof.component';
// <<<<<<< HEAD
import { NewDocumentComponent } from './new-document/new-document.component';
import { ButtonsComponent } from './buttons/buttons.component';
// =======
// >>>>>>> e4b05211b6c1df868d3e4eedaedaa6aa55e74a5c
// >>>>>>> 9d92655fcb984ba04d5db0e1674996095a96060a

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
// <<<<<<< HEAD
    ListofComponent,
    NewDocumentComponent,
    ButtonsComponent,

// <<<<<<< HEAD
    RegisterComponent,
// =======
    ListofComponent
// >>>>>>> e4b05211b6c1df868d3e4eedaedaa6aa55e74a5c
// >>>>>>> 9d92655fcb984ba04d5db0e1674996095a96060a
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

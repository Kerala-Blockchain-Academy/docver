import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
// <<<<<<< HEAD
import { RegisterComponent } from './register/register.component';
// =======
import { ListofComponent } from './listof/listof.component';
// <<<<<<< HEAD
import { NewDocumentComponent } from './new-document/new-document.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { RouterModule } from '@angular/router';
import { BirthFormComponent } from './forms/birth-form/birth-form.component';
import { DeathFormComponent } from './forms/death-form/death-form.component';
import { MarriageFormComponent } from './forms/marriage-form/marriage-form.component';
import { FormsComponent } from './forms/forms.component';
import { MarriageSearchComponent } from './search/marriage-search/marriage-search.component';
import { BirthSearchComponent } from './search/birth-search/birth-search.component';
import { DeathSearchComponent } from './search/death-search/death-search.component';
import { HttpClientModule } from '@angular/common/http';
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
    ListofComponent,
BirthFormComponent,
DeathFormComponent,
MarriageFormComponent,
BirthSearchComponent,
MarriageSearchComponent,
DeathSearchComponent,
FormsComponent
// >>>>>>> e4b05211b6c1df868d3e4eedaedaa6aa55e74a5c
// >>>>>>> 9d92655fcb984ba04d5db0e1674996095a96060a
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot([
        {path: 'Generate/marriageForm', component: MarriageFormComponent},
        {path: 'Generate/deathForm', component: DeathFormComponent},
        {path: 'Generate/birthForm', component: BirthFormComponent},
        {path:'Search/birthForm' , component:BirthSearchComponent},
        {path:'Search/deathForm' , component:DeathSearchComponent},
        {path:'Search/marriageForm' , component:MarriageSearchComponent},
        
        {path: 'docList', component: ListofComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'login', component: LoginComponent},
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        {path: '**', redirectTo: 'login', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AddCreatorComponent} from './add-creator/add-creator.component';
import {ListCreatorComponent} from './list-creator/list-creator.component';
import {AddCharacterComponent} from './add-character/add-character.component';
import {ListCharacterComponent} from './list-character/list-character.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCreatorComponent,
    ListCreatorComponent,
    AddCharacterComponent,
    ListCharacterComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

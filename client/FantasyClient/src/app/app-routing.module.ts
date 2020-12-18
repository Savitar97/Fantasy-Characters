import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListCreatorComponent} from './list-creator/list-creator.component';
import {AddCreatorComponent} from './add-creator/add-creator.component';
import {ListCharacterComponent} from './list-character/list-character.component';
import {AddCharacterComponent} from './add-character/add-character.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';


const routes: Routes = [{path: '', redirectTo: 'app-login', pathMatch: 'full'},
  {path: 'view-creator', component: ListCreatorComponent},
  {path: 'add-creator', component: AddCreatorComponent},
  {path: 'view-character', component: ListCharacterComponent},
  {path: 'add-character', component: AddCharacterComponent},
  {path: 'app-login', component: LoginComponent},
  {path: 'app-registration', component: RegistrationComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

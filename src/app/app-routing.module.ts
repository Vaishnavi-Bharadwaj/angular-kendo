import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConfigurationComponent } from './pages/form-configuration/form-configuration.component';
import { MemberRegistrationComponent } from './pages/member-registration/member-registration.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
const routes: Routes = [
  { path: 'configure', component: FormConfigurationComponent },
  { path: 'register', component: MemberRegistrationComponent },
  { path: 'set-password', component: SetPasswordComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConfigurationComponent } from './pages/form-configuration/form-configuration.component';
import { MemberRegistrationComponent } from './pages/member-registration/member-registration.component';
import { SetPasswordComponent } from './pages/set-password/set-password.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './services/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'configure', component: FormConfigurationComponent },
  { path: 'register', component: MemberRegistrationComponent },
  { path: 'set-password', component: SetPasswordComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

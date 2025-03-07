import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConfigurationComponent } from './pages/form-configuration/form-configuration.component';
import { MemberRegistrationComponent } from './pages/member-registration/member-registration.component';
const routes: Routes = [
  { path: 'configure', component: FormConfigurationComponent },
  { path: 'register', component: MemberRegistrationComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

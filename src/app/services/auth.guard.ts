import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    toast.warning('Session expired. Please log in again.', 'Warning');
    return false;
  }
};

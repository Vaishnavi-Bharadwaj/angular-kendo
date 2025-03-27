import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(email: string): void {
    sessionStorage.setItem('loggedInUser', email);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('loggedInUser');
  }
  
}

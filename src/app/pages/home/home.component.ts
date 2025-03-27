import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userName: string | null = '';

  constructor(private router: Router, private toast: ToastrService) {
    this.userName = sessionStorage.getItem('name') ; 
    console.log('Retrieved userName:', this.userName);
  }

  logout() {
    this.toast.success('Logged out successfully. Please register again!', 'Success');
    sessionStorage.clear(); 
    this.router.navigate(['/register']);
  }

}

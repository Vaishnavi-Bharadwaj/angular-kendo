import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/services/encryption.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login_form: FormGroup; 
  constructor(private fb: FormBuilder, private router: Router, private encryptionService: EncryptionService, private authService:AuthService, private toast:ToastrService) {
    this.login_form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
      ]],
      
    });
  }

  submitLoginForm() {
    if (this.login_form.valid) {
        const enteredEmail = this.login_form.get('email')?.value;
        const password = this.login_form.get('password')?.value;
        if (enteredEmail) {
            const encryptedPassword = sessionStorage.getItem(enteredEmail); 

            if (encryptedPassword) {
                const decryptedPassword = this.encryptionService.decrypt(encryptedPassword); 
                if (decryptedPassword !== password) { 
                  this.login_form.get('password')?.setErrors({ passwordMismatch: true }); 
                } else {
                  this.authService.login(enteredEmail);
                  this.toast.success('User logged in successfully', 'Success');  
                  this.router.navigate(['/home']);
                }
            } 
            else {
              this.toast.error('No account found with this email.', 'Error'); 
            } 
        }
        
    } 
    else { 
        this.toast.warning('Please fill in all required fields.', 'Warning');
    }
  }


  isPwdFieldInvalid(field: string): boolean {
    return !!this.login_form?.get(field)?.invalid && !!this.login_form?.get(field)?.touched;
  }

}

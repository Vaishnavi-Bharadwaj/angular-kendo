import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/services/encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login_form: FormGroup; 
  constructor(private fb: FormBuilder, private router: Router, private encryptionService: EncryptionService) {
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
                    this.router.navigate(['/home']); 
                }
            } 
            else {
              alert('No account found with this email.'); 
            } 
        }
        
    } 
    else {
        alert('Please fill in all required fields.');    
    }
  }


  isPwdFieldInvalid(field: string): boolean {
    return !!this.login_form?.get(field)?.invalid && !!this.login_form?.get(field)?.touched;
  }

}

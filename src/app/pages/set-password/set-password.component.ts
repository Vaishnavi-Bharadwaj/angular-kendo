import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { EncryptionService } from 'src/app/services/encryption.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent {
  pwd_form: FormGroup; 

  constructor(private fb: FormBuilder, private router: Router, private encryptionService: EncryptionService, private toast:ToastrService) {
    this.pwd_form = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,15}$/)
      ]],
      confirmpassword: ['', Validators.required]
    }, { validators: this.matchPassword });
  }

  matchPassword(form: AbstractControl) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmpassword');
  
    if (!password || !confirmPassword) return null;
  
    if (confirmPassword.value !== password.value) {
      confirmPassword.setErrors({ ...confirmPassword.errors, passwordMismatch: true });
    } else {
      // Remove passwordMismatch but keep other errors (like required)
      if (confirmPassword.errors) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
    }
    return null;
  }
  
  submitPwdForm() {
    if (this.pwd_form.valid) {
        const email = sessionStorage.getItem('email'); 
        const password = this.pwd_form.get('password')?.value;
        if (email && password) {
            const encryptedPassword = this.encryptionService.encrypt(password);
            sessionStorage.setItem(email, encryptedPassword); 
        }
        this.toast.success('Your password has been set successfully. Please log in.', 'Success');
        this.router.navigate(['/login']);
    } else if (this.pwd_form.get('confirmpassword')?.errors?.['passwordMismatch']) {
        return;
    } else {
        this.toast.warning('Please fill in all required fields.', 'Warning');
    }
  }

  isPwdFieldInvalid(field: string): boolean {
    return !!this.pwd_form?.get(field)?.invalid && !!this.pwd_form?.get(field)?.touched;
  }

}

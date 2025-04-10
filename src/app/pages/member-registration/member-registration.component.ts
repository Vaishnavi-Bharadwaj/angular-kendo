// for user registration based on dynamic form fields
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormConfigService } from 'src/app/services/form-config.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.scss']
})
export class MemberRegistrationComponent {
  form: FormGroup; 
  fields: any[] = []; 

  constructor(private fb: FormBuilder, private configService: FormConfigService, private router:Router, private toast:ToastrService) 
  {
    this.fields = this.configService.getFields().filter(f => f.show); 
    this.form = this.fb.group({}); 
  
    this.fields.forEach(field => {
      let validators = field.required ? [Validators.required] : []; 
  
      if (field.name.toLowerCase() === 'name') {
        validators.push(Validators.pattern('^[a-zA-Z ]+$')); 
      } 
      if (field.name.toLowerCase() === 'email') {
        validators.push(Validators.email); 
      } 
      if (field.name.toLowerCase() === 'mobile') {
        validators.push(Validators.pattern('^(\\+91\\d{10}|\\d{10})$')); 
      } 
      if (field.name.toLowerCase() === 'address') {
        validators.push(Validators.minLength(5)); 
      }
  
      this.form.addControl(field.name.toLowerCase(), this.fb.control('', validators));
    });
  }

  submitForm() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const userName = this.form.get('name')?.value;

      const storedEmail = sessionStorage.getItem('email');
      if (storedEmail === email) {
          this.toast.warning('This email is already registered. Please use a different email.', 'Warning');
          return;
      }
      
      if (email) {
        sessionStorage.setItem('email', email);
      }
      if (userName)
      {
        sessionStorage.setItem('name', userName);
      }
      this.router.navigate(['/set-password']);
    } 
    else {
      this.toast.warning('Please fill in all required fields.', 'Warning');
    }
  }

  isFieldInvalid(field: string): boolean {
    return !!this.form?.get(field)?.invalid && !!this.form?.get(field)?.touched;
  }
  
}

// for user registration based on dynamic form fields
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormConfigService } from 'src/app/services/form-config.service';
@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.scss']
})
export class MemberRegistrationComponent {
  form: FormGroup; 
  fields: any[] = []; 

  constructor(private fb: FormBuilder, private configService: FormConfigService) 
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
      alert('Form submitted successfully!');
      this.form.reset();
    } else {
      alert('Please fill in the required fields.');
    }
  }

  isFieldInvalid(field: string): boolean {
    return !!this.form?.get(field)?.invalid && !!this.form?.get(field)?.touched;
  }
  
  isFormEmpty(): boolean {
    return Object.values(this.form.value).every(value => value === '' || value === null);
  }
  
}

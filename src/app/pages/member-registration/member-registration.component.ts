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
  form: FormGroup; //holds the angular reactive form group to manage form control and validation
  fields: any[] = []; //array to store the fields that will be displayed in the registration form

  constructor(private fb: FormBuilder, private configService: FormConfigService) // FormBuilder is used to manage the reactive forms and FormConfigService is used to fetch the form field configuration e.g. field names
  {
    this.fields = this.configService.getFields().filter(f => f.show); // selecting only those that have their show property set to true
    this.form = this.fb.group({}); //form group to store the fields from the fields array which will be populated later 
  
    this.fields.forEach(field => {
      let validators = field.required ? [Validators.required] : []; // Add required validation if needed
  
      if (field.name.toLowerCase() === 'name') {
        validators.push(Validators.pattern('^[a-zA-Z ]+$')); // Only letters and spaces
      } 
      if (field.name.toLowerCase() === 'email') {
        validators.push(Validators.email); // Email format validation
      } 
      if (field.name.toLowerCase() === 'mobile') {
        validators.push(Validators.pattern('^(\\+91\\d{10}|\\d{10})$')); // Exactly 10 digits and 12 digits with country code
      } 
      if (field.name.toLowerCase() === 'address') {
        validators.push(Validators.minLength(5)); // Minimum 5 characters
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

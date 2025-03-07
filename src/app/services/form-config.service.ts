//to store and manage the form configuration data
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  //constructor() { }

  private fields = [
    { name: 'Name', show: true, required: false },
    { name: 'Mobile', show: true, required: false},
    { name: 'Email', show: true, required: false},
    { name: 'Address', show: true, required: false},
  ];

  getFields() {
    return this.fields;
    //return this.fields.sort((a, b) => a.order - b.order);
  }

  updateFields(fields: any[]) {
    this.fields = fields;
  }
}

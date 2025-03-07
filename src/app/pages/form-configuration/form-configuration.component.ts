// for managing the form configuration
import { Component } from '@angular/core';
import { FormConfigService } from 'src/app/services/form-config.service'; //fetch the form field configurations using the FormConfigService
import { Router } from '@angular/router';
@Component({
  selector: 'app-form-configuration',
  templateUrl: './form-configuration.component.html',
  styleUrls: ['./form-configuration.component.scss']
})


export class FormConfigurationComponent {
  fields: any[] = [];
  draggedItemIndex: number | null = null;
  
  constructor(private configService: FormConfigService, private router:Router) {
    this.fields = JSON.parse(JSON.stringify(this.configService.getFields())); //shallow copy so that the changes do not get reflected before saving changes on the form configuration
  }

  // Handle drag start event and store the index of the dragged item
  onDragStart(event: DragEvent, index: number) {
    this.draggedItemIndex = index;
    // Set data to transfer and add the 'dragging' class
    event.dataTransfer?.setData('text', index.toString()); //store and retrieve information while dragging
    // Ensure that the target is an HTMLElement
    const target = event.target as HTMLElement;
    if (target) {
      target.classList.add('dragging'); // Dynamically adds a class to style the dragged element.
    }
  }

  // Allow the drop event by preventing the default action
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Allow the drop action (target is recognized as a valid drop zone)
  }

  // Handle the drop event to reorder the items
  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    if (this.draggedItemIndex !== null) {
      // Swap the dragged item with the target item
      const draggedItem = this.fields[this.draggedItemIndex];
      this.fields.splice(this.draggedItemIndex, 1);
      this.fields.splice(index, 0, draggedItem);
      this.draggedItemIndex = null;

      // Remove the 'dragging' class
      const draggingElement = document.querySelector('.dragging');
      draggingElement?.classList.remove('dragging');

      console.log('Updated order:', this.fields);
    }
  }

  // Remove the 'dragging' class once drag ends
  onDragEnd(event: DragEvent) {
    const target = event.target as HTMLElement;
    if (target) {
      target.classList.remove('dragging'); // Remove 'dragging' class from the target element
    }
  }

  saveChanges() {
    this.configService.updateFields(this.fields);
    alert('Configuration saved!');
    this.router.navigate(['/register']);
  }

}

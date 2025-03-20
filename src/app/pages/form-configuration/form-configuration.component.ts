// for managing the form configuration
import { Component } from '@angular/core';
import { FormConfigService } from 'src/app/services/form-config.service'; 
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
    this.fields = JSON.parse(JSON.stringify(this.configService.getFields())); 
  }

  onDragStart(event: DragEvent, index: number) {
    this.draggedItemIndex = index;
    event.dataTransfer?.setData('text', index.toString()); 
    const target = event.target as HTMLElement;
    if (target) {
      target.classList.add('dragging'); 
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); 
  }

  onDrop(event: DragEvent, index: number) {
    event.preventDefault();
    if (this.draggedItemIndex !== null) {
      const draggedItem = this.fields[this.draggedItemIndex];
      this.fields.splice(this.draggedItemIndex, 1);
      this.fields.splice(index, 0, draggedItem);
      this.draggedItemIndex = null;

      const draggingElement = document.querySelector('.dragging');
      draggingElement?.classList.remove('dragging');

      console.log('Updated order:', this.fields);
    }
  }

  onDragEnd(event: DragEvent) {
    const target = event.target as HTMLElement;
    if (target) {
      target.classList.remove('dragging'); 
    }
  }

  saveChanges() {
    this.configService.updateFields(this.fields);
    alert('Configuration saved!');
    this.router.navigate(['/register']);
  }

}

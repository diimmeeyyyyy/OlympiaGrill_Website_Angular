import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-salad-selection',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './salad-selection.component.html',
  styleUrl: './salad-selection.component.scss',
})
export class SaladSelectionComponent {
  @Input() dish: any;
  @Input() foodContainerindex!: number;
  @Output() saladSelected = new EventEmitter<string>();
  selectedSalad: string = 'Krautsalat'; // Default-Wert
 
  onSaladChange() {
    this.saladSelected.emit(this.selectedSalad);
  }
}

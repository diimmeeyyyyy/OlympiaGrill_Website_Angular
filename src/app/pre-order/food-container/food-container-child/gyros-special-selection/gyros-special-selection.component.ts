import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gyros-special-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gyros-special-selection.component.html',
  styleUrl: './gyros-special-selection.component.scss',
})
export class GyrosSpecialSelectionComponent {
  @Input() dish: any;
  @Input() foodContainerindex!: number;

  @Output() gyrosSpecialSelected = new EventEmitter<string>();
  selectedGyrosSpecial: string = 'Mit Gouda-Käse & Metaxa-Sauce'; // Default-Value

  onGyrosSpecialChange() {
    this.gyrosSpecialSelected.emit(this.selectedGyrosSpecial);
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bifteki-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bifteki-selection.component.html',
  styleUrl: './bifteki-selection.component.scss',
})
export class BiftekiSelectionComponent {
  @Input() dish: any;
  @Input() foodContainerindex!: number;

  @Output() biftekiSelected = new EventEmitter<string>();
  selectedBifteki: string = 'Mit Gouda-Käse'; // Default-Value

  onBiftekiChange() {
    this.biftekiSelected.emit(this.selectedBifteki);
  }
}

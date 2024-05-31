import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sides-selection',
  standalone: true,
  imports: [],
  templateUrl: './sides-selection.component.html',
  styleUrl: './sides-selection.component.scss',
})
export class SidesSelectionComponent {
  @Input() dish: any;
  @Input() foodContainerindex!: number;
  @Output() selectedValueChange = new EventEmitter<string>();

  selectedValue?: string;

  emitSelectedValue(event: Event) {
    this.selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedValueChange.emit(this.selectedValue);
  }
}

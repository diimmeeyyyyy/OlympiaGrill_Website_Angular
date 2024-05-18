import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-salad-selection',
  standalone: true,
  imports: [],
  templateUrl: './salad-selection.component.html',
  styleUrl: './salad-selection.component.scss',
})
export class SaladSelectionComponent {
  @Input() dish: any;
  @Input() foodContainerindex!: number;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bifteki-selection',
  standalone: true,
  imports: [],
  templateUrl: './bifteki-selection.component.html',
  styleUrl: './bifteki-selection.component.scss',
})
export class BiftekiSelectionComponent {
  @Input() dish: any;
  @Input() foodContainerindex!: number;
}

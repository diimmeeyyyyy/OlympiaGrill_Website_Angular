import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gyros-special-selection',
  standalone: true,
  imports: [],
  templateUrl: './gyros-special-selection.component.html',
  styleUrl: './gyros-special-selection.component.scss',
})
export class GyrosSpecialSelectionComponent {
  @Input() dish: any;
  @Input() foodContainerindex!: number;
}

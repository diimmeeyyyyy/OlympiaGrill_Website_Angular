import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-food-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-container.component.html',
  styleUrl: './food-container.component.scss',
})
export class FoodContainerComponent {
  @Input() dish: any; // Fügen Sie diese Zeile hinzu
}

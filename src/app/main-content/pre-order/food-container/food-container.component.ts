import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PreOrderComponent } from '../pre-order.component';
import { FoodContainerChildComponent } from './food-container-child/food-container-child.component';

@Component({
  selector: 'app-food-container',
  standalone: true,
  imports: [CommonModule, FoodContainerChildComponent,],
  templateUrl: './food-container.component.html',
  styleUrl: './food-container.component.scss',
})
export class FoodContainerComponent {
  @Input() dish: any; // Fügen Sie diese Zeile hinzu
  @Input() index!: number;
  showChild = false;

  toggleChild() {
    this.showChild = !this.showChild;
  }
}

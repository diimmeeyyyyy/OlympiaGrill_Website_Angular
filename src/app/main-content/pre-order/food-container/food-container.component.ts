import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { PreOrderComponent } from '../pre-order.component';
import { FoodContainerChildComponent } from './food-container-child/food-container-child.component';

@Component({
  selector: 'app-food-container',
  standalone: true,
  imports: [CommonModule, FoodContainerChildComponent],
  templateUrl: './food-container.component.html',
  styleUrl: './food-container.component.scss',
})
export class FoodContainerComponent {
  @Input() dish: any;
  @Input() index!: number;
  showChild = false;

  @ViewChild('mainContainer') mainContainer!: ElementRef;

  toggleChild() {
    this.showChild = !this.showChild;
    if (this.showChild) {
      this.scrollToTop();
    }
  }

  scrollToTop() {
    let clickedContainer = this.mainContainer.nativeElement as HTMLElement;
    console.log(clickedContainer);
    let clickedContainerPosition = clickedContainer.getBoundingClientRect().top;
    console.log('clickedContainerPosition is' + clickedContainerPosition);
    let targetPosition = window.scrollY + clickedContainerPosition - 10;
    console.log('TargetPosition is' + targetPosition);

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }
}

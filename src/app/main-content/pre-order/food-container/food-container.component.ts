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
  childContainer!: ElementRef;
  onChildContainerReady(childContainer: ElementRef) {
    this.childContainer = childContainer;
  }

  toggleChild() {
    this.showChild = !this.showChild;
    if (this.showChild) {
      this.scrollToTop();
    }
  }

  scrollToTop() {
    let clickedContainer = this.mainContainer.nativeElement as HTMLElement;
    let clickedContainerPosition = clickedContainer.getBoundingClientRect().top;
    let targetPosition = window.scrollY + clickedContainerPosition - 10;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }

  closeChildContainer() {
    const element = this.childContainer.nativeElement;

    element.animate(
      [
        // keyframes
        { transform: 'scale(1)' },
        { transform: 'scale(0)' },
      ],
      {
        // timing options
        duration: 250,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );

    setTimeout(() => {
      this.showChild = false;
    }, 251);
  }

/*   animateClickedButton() {
    const element = this.childContainer.nativeElement;

    element.animate(
      [
        // keyframes
        { transform: 'scale(1)' },
        { transform: 'scale(0)' },
      ],
      {
        // timing options
        duration: 250,
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );
  } */
}

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-food-menu-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-menu-nav.component.html',
  styleUrl: './food-menu-nav.component.scss',
})
export class FoodMenuNavComponent implements AfterViewInit {
  @ViewChild('Food_Navigation') foodNavigation!: ElementRef;
  @ViewChild('Arrow_Left') arrowLeft!: ElementRef;
  @ViewChild('Arrow_Right') arrowRight!: ElementRef;
  @ViewChild('Selected_Food_Type') selectedFoodType!: ElementRef;

  @Output() foodTypeString = new EventEmitter<string>();

  ngAfterViewInit() {
    this.updateArrowVisibility();

    this.foodNavigation.nativeElement.addEventListener('scroll', () => {
      this.updateArrowVisibility();
    });
  }

  updateArrowVisibility() {
    const element = this.foodNavigation.nativeElement;
    const scrollPositionFromRight =
      element.scrollWidth - element.scrollLeft - element.clientWidth;

    if (element.scrollLeft > 50) {
      this.arrowLeft.nativeElement.style.display = 'flex';
      this.arrowLeft.nativeElement.style.position = 'absolute';
      this.arrowLeft.nativeElement.style.left = '0';
    } else {
      this.arrowLeft.nativeElement.style.display = 'none';
    }

    if (scrollPositionFromRight < 50) {
      this.arrowRight.nativeElement.style.display = 'none';
    } else {
      this.arrowRight.nativeElement.style.display = 'flex';
      this.arrowRight.nativeElement.style.position = 'absolute';
      this.arrowRight.nativeElement.style.right = '0';
    }
  }

  updateSelectedFoodType(foodTypeNumber: number, foodTypeText: string) {
    const pTags = this.foodNavigation.nativeElement.querySelectorAll('p');
    for (let i = 0; i < pTags.length; i++) {
      pTags[i].style.fontWeight = 'normal';
    }
    pTags[foodTypeNumber].style.fontWeight = 'bold';
    this.selectedFoodType.nativeElement.textContent = foodTypeText;
    this.emitFoodTypeText(foodTypeText);
  }

  emitFoodTypeText(foodTypeText: string) {
    this.foodTypeString.emit(foodTypeText);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PreorderdataService } from '../firebase-services/preorderdata.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private preOrderService: PreorderdataService) {}

  checkMarginBottom() {
    return this.preOrderService.totalItemAmount > 0 && window.innerWidth < 690;
  }
}

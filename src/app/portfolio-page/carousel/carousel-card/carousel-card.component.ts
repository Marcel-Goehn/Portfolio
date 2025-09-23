import { Component, input } from '@angular/core';
import { type Testimonial } from '../carousel.model';

@Component({
  selector: 'app-carousel-card',
  standalone: true,
  imports: [],
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.scss'
})
export class CarouselCardComponent {
  testimonialInfo = input.required<{ text: string, name: string }>();
}

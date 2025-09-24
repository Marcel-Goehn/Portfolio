import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CarouselCardComponent } from "./carousel-card/carousel-card.component";
import { type Testimonial } from './carousel.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselCardComponent, NgClass],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
  testimonialData = signal<Testimonial[]>([
    {
      text: "Working with Marcel was always reliable and pleasant. He communicates clearly, thinks ahead, and delivers clean, well-documented code. Deadlines were consistently met, and even during challenging phases, he remained solution-oriented and professional.",
      name: "P. Höpner - Team Partner"
    },
    {
      text: "Working with Marcel was a pleasure. His quick understanding of complex problems and clean, maintainable code pushed our project forward.",
      name: "S. Weber – Project Lead"
    },
    {
      text: "Marcel consistently delivers high-quality work and brings great ideas to the table. His positive attitude keeps the whole team motivated.",
      name: "L. Fischer – Team Member"
    },
    {
      text: "Marcel Göhn combines technical skill with a natural sense for teamwork. He not only writes clean and maintainable code, but also contributes valuable ideas that improve the overall project. Whenever unexpected issues appeared, Marcel approached them with creativity and a calm mindset, making him a trusted problem-solver.",
      name: "K. Stein – Team Coordinator"
    },
    {
      text: "It’s rare to meet someone as dependable as Marcel. He takes ownership of his work, delivers on time, and keeps communication transparent. Whether refining details or tackling major features, Marcel shows both precision and dedication, which consistently raises the quality of our results.",
      name: "J. Brandt – Lead Developer"
    }
  ]);

  currentCarouselCard = signal(0);

  moveLeft = signal(false);
  moveRight = signal(false);

  disableButton = computed(() => {
    if (this.moveLeft() || this.moveRight()) {
      return true;
    } else {
      return false;
    }
  })


  scrollCarousel(direction: 'left' | 'right') {
    if (direction === 'left') {
      const lastElement = this.testimonialData()[this.testimonialData().length - 1];
      const filteredArray = this.testimonialData().filter(element => element !== lastElement);
      this.moveRight.set(true);
      setTimeout(() => {
        this.testimonialData.set([lastElement, ...filteredArray]);
        this.moveRight.set(false);
      }, 1000);
      this.currentCarouselCard.update(prevIndex => (prevIndex - 1 + this.testimonialData().length) % this.testimonialData().length);
    } else {
      const firstElement = this.testimonialData()[0];
      const filteredArray = this.testimonialData().filter(element => element !== firstElement);
      this.moveLeft.set(true);
      setTimeout(() => {
        this.testimonialData.set([...filteredArray, firstElement]);
        this.moveLeft.set(false);
      }, 1000);
      this.currentCarouselCard.update(prevIndex => (prevIndex + 1) % this.testimonialData().length);
    }
  }
}

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
      text: $localize`Working with Marcel was always reliable and pleasant. He communicates clearly, thinks ahead, and delivers clean, well-documented code. Deadlines were consistently met, and even during challenging phases, he remained solution-oriented and professional.`,
      name: "P. Höpner - Team Member"
    },
    {
      text: $localize`Working with Marcel was a pleasure. His quick understanding of complex problems and clean, maintainable code pushed our project forward.`,
      name: "S. Weber – Team Member"
    },
    {
      text: $localize`Marcel consistently delivers high-quality work and brings great ideas to the table. His positive attitude keeps the whole team motivated.`,
      name: "L. Fischer – Team Member"
    },
    {
      text: $localize`Marcel brings great energy and focus to every project. His eye for detail and ability to turn ideas into elegant solutions impressed the whole team.`,
      name: "L. Hoffmann – Team Member"
    },
    {
      text: $localize`Collaborating with Marcel was seamless. He combines strong technical skills with clear communication, making complex tasks look effortless.`,
      name: "A. Richter – Team Member"
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


  /**
   * This method checks in wich direction the carousel should scroll and calls the right method for it
   * 
   * @param direction - It tells the carousel in wich direction it should slide
   */
  scrollCarousel(direction: 'left' | 'right') {
    if (direction === 'left') {
      this.scrollLeft();
    } else {
      this.scrollRight();
    }
  }


  /**
   * This method will scroll the carousel to the left side
   */
  scrollLeft() {
    const lastElement = this.testimonialData()[this.testimonialData().length - 1];
    const filteredArray = this.testimonialData().filter(element => element !== lastElement);
    this.moveRight.set(true);
    setTimeout(() => {
      this.testimonialData.set([lastElement, ...filteredArray]);
      this.moveRight.set(false);
    }, 1000);
    this.currentCarouselCard.update(prevIndex => (prevIndex - 1 + this.testimonialData().length) % this.testimonialData().length);
  }


  /**
   * This method will scroll the carousel to the right side
   */
  scrollRight() {
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

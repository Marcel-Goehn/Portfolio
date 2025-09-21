import { NgClass } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgClass],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterViewInit {
  private carouselEl = viewChild.required<ElementRef<HTMLUListElement>>('carousel');
  private firstCardEl = viewChild.required<ElementRef<HTMLElement>>('card');
  firstCardWidth = signal<null | number>(null);
  carouselChildrens = signal<Element[] | []>([]);

  isDragging = signal(false);
  startX = signal(0);
  startScrollLeft = signal(0);

  cardPerView = signal(0);


  ngAfterViewInit(): void {
    this.firstCardWidth.set(this.firstCardEl().nativeElement.offsetWidth);
    this.carouselChildrens.set(Array.from(this.carouselEl().nativeElement.children));
    this.cardPerView.set(Math.round(this.carouselEl().nativeElement.offsetWidth / this.firstCardWidth()!));

    this.carouselChildrens().slice(-this.cardPerView()).reverse().forEach(card => {
      this.carouselEl().nativeElement.insertAdjacentHTML('afterbegin', card.outerHTML);
    });

    this.carouselChildrens().slice(0, this.cardPerView()).forEach(card => {
      this.carouselEl().nativeElement.insertAdjacentHTML('beforeend', card.outerHTML);
    });
  }


  buttonScroll(scrollSide: string) {
    this.carouselEl().nativeElement.scrollLeft += scrollSide === 'left' ? -this.firstCardWidth()! : this.firstCardWidth()!;
  }


  dragStart(e: MouseEvent) {
    this.isDragging.set(true);
    this.carouselEl().nativeElement.classList.add('dragging');

    this.startX.set(e.pageX);
    this.startScrollLeft.set(this.carouselEl().nativeElement.scrollLeft);
  }


  @HostListener('document:mouseup')
  dragEnd() {
    this.isDragging.set(false);
    this.carouselEl().nativeElement.classList.remove('dragging');
  }


  dragging(e: MouseEvent) {
    if (!this.isDragging()) return;

    this.carouselEl().nativeElement.scrollLeft = this.startScrollLeft() - (e.pageX - this.startX());
  }


  infiniteScroll() {
    if (this.carouselEl().nativeElement.scrollLeft === 0) {
      this.carouselEl().nativeElement.classList.add('no-transition');
      this.carouselEl().nativeElement.scrollLeft = this.carouselEl().nativeElement.scrollWidth - (2 * this.carouselEl().nativeElement.offsetWidth);
      this.carouselEl().nativeElement.classList.remove('no-transition');
    }
    else if (Math.ceil(this.carouselEl().nativeElement.scrollLeft) === this.carouselEl().nativeElement.scrollWidth - this.carouselEl().nativeElement.offsetWidth) {
      this.carouselEl().nativeElement.classList.add('no-transition');
      this.carouselEl().nativeElement.scrollLeft = this.carouselEl().nativeElement.offsetWidth;
      this.carouselEl().nativeElement.classList.remove('no-transition');
    }
  }
}

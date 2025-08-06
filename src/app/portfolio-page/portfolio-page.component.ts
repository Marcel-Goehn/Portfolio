import { Component, HostListener } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { AboutMeComponent } from "./about-me/about-me.component";

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [HeroComponent, AboutMeComponent],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss'
})
export class PortfolioPageComponent {
  currentWindowWidth: number = window.innerWidth;

  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }
}

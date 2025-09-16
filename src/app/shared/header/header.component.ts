import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class HeaderComponent {
  private headerService = inject(HeaderService);
  aboutMeIsClicked = this.headerService.aboutmeIsClicked$;
  skillIsClicked = this.headerService.skillIsClicked$;
  projectsIsClicked = this.headerService.projectIsClicked$;

  english = signal(true);
  german = signal(false);
  currentWindowWidth = signal(window.innerWidth);
  burgerMenuOpen = signal(false);


  changeLanguage() {
    this.english.set(!this.english());
    this.german.set(!this.german());
  }


  changeActiveNavLink(boolOne: boolean, boolTwo: boolean, boolThree: boolean) {
    this.headerService.changeActiveNavLink(boolOne, boolTwo, boolThree);
  }


  onResize() {
    this.currentWindowWidth.set(window.innerWidth);
  }


  openBurgerMenu() {
    this.burgerMenuOpen.set(true);
  }


  closeBurgerMenu() {
    this.burgerMenuOpen.set(false);
  }
}

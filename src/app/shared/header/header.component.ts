import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class HeaderComponent {
  english = signal(true);
  german = signal(false);
  aboutMeIsClicked = signal(false);
  skillsIsClicked = signal(false);
  projectsIsClicked = signal(false);
  currentWindowWidth = signal(window.innerWidth);
  burgerMenuOpen = signal(false);

  changeLanguage() {
    this.english.set(!this.english());
    this.german.set(!this.german());
  }


  changeActiveNavLink(booleanOne: boolean, booleanTwo: boolean, booleanThree: boolean) {
    this.aboutMeIsClicked.set(booleanOne);
    this.skillsIsClicked.set(booleanTwo);
    this.projectsIsClicked.set(booleanThree);
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

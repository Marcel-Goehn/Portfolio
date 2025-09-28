import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderService } from './header.service';
import { LogoComponent } from "../logo/logo.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class HeaderComponent implements OnInit {
  private headerService = inject(HeaderService);
  aboutMeIsClicked = this.headerService.aboutmeIsClicked$;
  skillIsClicked = this.headerService.skillIsClicked$;
  projectsIsClicked = this.headerService.projectIsClicked$;

  english = signal(true);
  german = signal(false);
  currentWindowWidth = signal(window.innerWidth);
  burgerMenuOpen = signal(false);


  /**
   * Add's the css to the current active language button
   */
  ngOnInit(): void {
    if (window.location.href.includes('/de/')) {
      this.german.set(true);
      this.english.set(false);
    } else {
      this.english.set(true);
      this.german.set(false);
    }
  }


  /**
   * Changes the language and redirects to the right page
   */
  changeLanguage() {
    if (this.english()) {
      window.location.assign('https://marcelgoehn.de/de/');
    } else {
      window.location.assign('https://marcelgoehn.de/en-US/');
    }
  }


  /**
   * This method changes the active link when a links is getting clicked 
   */
  changeActiveNavLink(boolOne: boolean, boolTwo: boolean, boolThree: boolean) {
    this.headerService.changeActiveNavLink(boolOne, boolTwo, boolThree);

    if (this.burgerMenuOpen()) {
      this.closeBurgerMenu();
    }
  }


  /**
   * Saves the current window width in the currentWindowWidth variable when the screen get's resized
   */
  onResize() {
    this.currentWindowWidth.set(window.innerWidth);
  }


  /**
   * This method opens the burger menu
   */
  openBurgerMenu() {
    this.burgerMenuOpen.set(true);
  }


  /**
   * This method closes the burger menu
   */
  closeBurgerMenu() {
    this.burgerMenuOpen.set(false);
  }
}

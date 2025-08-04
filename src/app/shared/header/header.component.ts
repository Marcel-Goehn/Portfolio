import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  english: boolean = true;
  german: boolean = false;
  aboutMeIsClicked: boolean = false;
  skillsIsClicked: boolean = false;
  projectsIsClicked: boolean = false;
  currentWindowWidth: number = window.innerWidth;
  burgerMenuOpen: boolean = false;

  changeLanguage() {
    this.english = !this.english;
    this.german = !this.german;
  }


  changeActiveNavLink(booleanOne: boolean, booleanTwo: boolean, booleanThree: boolean) {
    this.aboutMeIsClicked = booleanOne;
    this.skillsIsClicked = booleanTwo;
    this.projectsIsClicked = booleanThree;
  }


  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }


  openBurgerMenu() {
    this.burgerMenuOpen = true;
  }


  closeBurgerMenu() {
    this.burgerMenuOpen = false;
  }
}

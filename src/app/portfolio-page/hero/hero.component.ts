import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  @Input() currentWindowWidth: number = window.innerWidth;
  linkedInIsHovered = false;
  githubIsHovered = false;
  mailIsHovered = false;


  changeGithubHoverState(bool: boolean) {
    this.githubIsHovered = bool;
  }


  changeLinkedInHoverState(bool: boolean) {
    this.linkedInIsHovered = bool;
  }


  changeMailHoverState(bool: boolean) {
    this.mailIsHovered = bool;
  }
}

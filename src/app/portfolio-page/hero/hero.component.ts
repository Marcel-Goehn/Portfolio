import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { MarqueeComponent } from "./marquee/marquee.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MarqueeComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  currentWindowWidth = input.required<number>();
  linkedInIsHovered = signal(false);
  githubIsHovered = signal(false);
  mailIsHovered = signal(false);


  changeGithubHoverState(bool: boolean) {
    this.githubIsHovered.set(bool);
  }


  changeLinkedInHoverState(bool: boolean) {
    this.linkedInIsHovered.set(bool);
  }


  changeMailHoverState(bool: boolean) {
    this.mailIsHovered.set(bool);
  }    
}

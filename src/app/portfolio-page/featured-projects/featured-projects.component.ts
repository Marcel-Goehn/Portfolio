import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [NgClass],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedProjectsComponent {
  projectOneIsHovered = signal(false);
  projectTwoIsHovered = signal(false);
  projectThreeIsHovered = signal(false);


  toggleImage(project: string)  {
    if (project === 'one') {
      this.projectOneIsHovered.set(!this.projectOneIsHovered());
    } else if (project === 'two') {
      this.projectTwoIsHovered.set(!this.projectTwoIsHovered())
    } else {
      this.projectThreeIsHovered.set(!this.projectThreeIsHovered())
    }
  };
}

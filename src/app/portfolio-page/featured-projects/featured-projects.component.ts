import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { DialogService } from './dialog/dialog.service';
import { DialogComponent } from "./dialog/dialog.component";

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [NgClass, DialogComponent],
  templateUrl: './featured-projects.component.html',
  styleUrl: './featured-projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedProjectsComponent {
  private dialogService = inject(DialogService);
  showDialog = this.dialogService.dialogOpened;
  currentWindowWidth = input.required<number>()
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
  }

  openDialog(i: number) {
    this.dialogService.changeIndex(i);
    this.dialogService.dialogOpened.set(true);
  }
}

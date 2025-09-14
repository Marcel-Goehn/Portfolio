import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { DialogComponent } from './shared/dialog/dialog.component';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mousemove)': 'calculateMouseShadow($event)' 
  }
})
export class AppComponent {
  private dialogService = inject(DialogService);
  topPosition = signal<number | null>(null);
  leftPosition = signal<number | null>(null);
  showDialog = this.dialogService.dialogOpened;


  calculateMouseShadow(e: MouseEvent) {
    this.topPosition.set(e.clientY);
    this.leftPosition.set(e.clientX);
  }
}

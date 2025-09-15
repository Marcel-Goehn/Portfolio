import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mousemove)': 'calculateMouseShadow($event)' 
  }
})
export class AppComponent {
  topPosition = signal<number | null>(null);
  leftPosition = signal<number | null>(null);


  calculateMouseShadow(e: MouseEvent) {
    this.topPosition.set(e.clientY);
    this.leftPosition.set(e.clientX);
  }
}

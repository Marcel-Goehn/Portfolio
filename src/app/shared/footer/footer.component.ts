import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  currentUrl = signal('');

  ngOnInit(): void {
    const subscription = this.activatedRoute.url.subscribe({
      next: (param) => {
        if (!param.length) {
          return;
        }
        this.currentUrl.set(param[0].path)
      }
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

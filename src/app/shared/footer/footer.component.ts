import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderService } from '../header/header.service';
import { LogoComponent } from "../logo/logo.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgClass, LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private headerService = inject(HeaderService);
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


  resetActiveHeaderLinks() {
    this.headerService.resetActiveHeaderLinks();
    this.router.navigate(['/legal-notice']);
  }
}

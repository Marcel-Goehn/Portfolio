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


  /**
   * Set's up a subscription when initializing the component. 
   * It watches if the route changes. Because it will decide wich background color the footer gets
   * 
   */
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


  /**
   * If the route is being changed from the landing page to the legal-notice page, the header links will be resetted
   */
  resetActiveHeaderLinks(route: string) {
    this.headerService.resetActiveHeaderLinks();
    this.router.navigate([route]);
  }
}

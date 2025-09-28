import { Routes } from '@angular/router';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';

export const routes: Routes = [
    {
        path: '',
        component: PortfolioPageComponent,
        title: $localize`Marcel Göhn | Portfolio`
    },
    {
        path: 'legal-notice',
        loadComponent: () => import('./legal-notice/legal-notice.component').then(mod => mod.LegalNoticeComponent),
        title: $localize`Marcel Göhn | Legal Notice`
    },
    {
        path: 'privacy-policy',
        loadComponent: () => import('./privacy-policy/privacy-policy.component').then(mod => mod.PrivacyPolicyComponent),
        title: $localize`Marcel Göhn | Privacy Policy`
    }
];

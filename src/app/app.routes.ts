import { Routes } from '@angular/router';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

export const routes: Routes = [
    { path: '', component: PortfolioPageComponent },
    { path: 'legal-notice', component: LegalNoticeComponent, }
];

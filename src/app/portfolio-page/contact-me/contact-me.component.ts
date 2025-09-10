import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactMeComponent {

}

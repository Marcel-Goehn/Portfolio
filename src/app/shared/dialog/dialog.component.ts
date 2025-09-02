import { Component, ElementRef, viewChild } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
   private dialogEl = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

   
  closeDialog() {
    this.dialogEl().nativeElement.close();
  }
}

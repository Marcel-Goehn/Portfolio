import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements AfterViewInit{
   private dialogEl = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');


  ngAfterViewInit(): void {
    // this.dialogEl().nativeElement.showModal();
  }


}

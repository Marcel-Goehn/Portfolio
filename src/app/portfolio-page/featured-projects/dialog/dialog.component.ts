import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { ButtonComponent } from "../../../shared/button/button.component";
import { DialogService } from './dialog.service';
import { PadStart } from './pad-start.pipe';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ButtonComponent, PadStart],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements AfterViewInit {
  private dialogEl = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private dialogService = inject(DialogService);
  data = this.dialogService.dialogData$;
  index = this.dialogService.index;


  ngAfterViewInit(): void {
    this.dialogEl().nativeElement.showModal();
  }


  incrementIndex() {
    this.dialogService.incrementIndex();
  }


  closeDialog() {
    this.dialogService.dialogOpened.set(false);
  }
}

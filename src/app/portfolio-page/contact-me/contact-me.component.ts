import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';


function mustAcceptPrivacyPolicy(control: AbstractControl) {
  if (control.value === true) {
    return null;
  }

  return { privacyPolicyIsNotAccepted: true };
}


@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, NgClass],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactMeComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  enteredNameInvalid = signal(false);
  enteredEmailInvalid = signal(false);
  enteredMessageInvalid = signal(false);
  checkboxValid = signal(false);

  form = new FormGroup({
    name: new FormControl("", {
      validators: [Validators.required]
    }),
    email: new FormControl("", {
      validators: [Validators.email, Validators.required]
    }),
    message: new FormControl("", {
      validators: [Validators.required]
    }),
    checkbox: new FormControl(false, {
      validators: [mustAcceptPrivacyPolicy]
    })
  });

  ngOnInit(): void {
    const subscription = this.form.controls.checkbox.valueChanges.subscribe({
      next: value => this.checkboxValid.set(value!)
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }


  onSubmit() {
    debugger;
    if (this.form.invalid) {
      if (!this.form.controls.name.valid) {
        this.enteredNameInvalid.set(true);
      }

      if (!this.form.controls.email.valid) {
        this.enteredEmailInvalid.set(true);
      }

      if (!this.form.controls.message.valid) {
        this.enteredMessageInvalid.set(true);
      }

      if (!this.form.controls.checkbox.valid) {
        this.checkboxValid.set(false);
      }

      return;
    }

    console.log(this.form);
    this.form.reset();
  }


  removeValidationError(formGroupMember: string) {
    if (formGroupMember === 'name') {
      this.enteredNameInvalid.set(false);
    } else if (formGroupMember === 'email') {
      this.enteredEmailInvalid.set(false);
    } else if (formGroupMember === 'message') {
      this.enteredMessageInvalid.set(false);
    }
  }
}

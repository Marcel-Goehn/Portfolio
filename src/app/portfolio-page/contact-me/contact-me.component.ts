import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from "../../shared/button/button.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';


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
  private httpClient = inject(HttpClient);
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
      validators: [Validators.email, Validators.required, Validators.pattern('[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}')]
    }),
    message: new FormControl("", {
      validators: [Validators.required]
    }),
    checkbox: new FormControl(false, {
      validators: [mustAcceptPrivacyPolicy]
    })
  });

  mailTest = true;

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };


  /**
   * Set's up a subscription when initializing this component to the checkbox of the formgroup
   * This subscription changes the checkboxValid variable when the value of the checkbox changes
   * 
   */
  ngOnInit(): void {
    const subscription = this.form.controls.checkbox.valueChanges.subscribe({
      next: value => this.checkboxValid.set(value!)
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }


  /**
   * This method submits the form, and if it is valid it calls the http client to send the email
   * 
   * @returns - It return's if the form is invalid
   */
  onSubmit() {
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
    this.sendMail(this.getContactData());
  }


  /**
   * 
   * @returns - It returns the input value of the form when it is getting submitted
   */
  getContactData() {
    return {
      name: this.form.controls.name.value!,
      email: this.form.controls.email.value!,
      message: this.form.controls.message.value!
    }
  }


  /**
   * This method send's the form data to the desired email address and reset's the form at the end
   * 
   * @param contactData - Hold's the value of the form
   */
  sendMail(contactData: { name: string, email: string, message: string }) {
    this.httpClient.post(this.post.endPoint, this.post.body(contactData))
      .subscribe({
        next: (response) => {
          this.form.reset();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }


  /**
   * It removes the validation error message when clicking into the input field
   * 
   * @param formGroupMember - The name of the input field
   */
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

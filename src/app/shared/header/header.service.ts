import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private aboutMeIsClicked = signal(false);
  private skillsIsClicked = signal(false);
  private projectsIsClicked = signal(false);

  aboutmeIsClicked$ = this.aboutMeIsClicked.asReadonly();
  skillIsClicked$ = this.skillsIsClicked.asReadonly();
  projectIsClicked$ = this.projectsIsClicked.asReadonly();


  changeActiveNavLink(booleanOne: boolean, booleanTwo: boolean, booleanThree: boolean) {
    this.aboutMeIsClicked.set(booleanOne);
    this.skillsIsClicked.set(booleanTwo);
    this.projectsIsClicked.set(booleanThree);
  }


  resetActiveHeaderLinks() {
    this.aboutMeIsClicked.set(false);
    this.skillsIsClicked.set(false);
    this.projectsIsClicked.set(false);
  }
}

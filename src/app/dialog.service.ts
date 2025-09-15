import { Injectable, signal } from '@angular/core';

import { type dialogData } from './dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogOpened = signal(false);
  index = signal(0);
  private dialogData = signal<dialogData[]>([
    {
      id: 1,
      title: 'Join',
      information: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      usedTech: ['CSS', 'HTML', 'Firebase', 'JavaScript'],
      snapshot: 'assets/img/dialog/join.png',
      github: 'https://github.com/Marcel-Goehn/Join-Dashboard'
    },
    {
      id: 2,
      title: 'El Pollo Loco',
      information: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      usedTech: ['JavaScript', 'HTML', 'CSS'],
      snapshot: 'assets/img/dialog/el-pollo-loco.png',
      github: 'https://github.com/Marcel-Goehn/El-Pollo-Loco'
    },
    {
      id: 3,
      title: 'Pokedex',
      information: 'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.',
      usedTech: ['JavaScript', 'HTML', 'CSS'],
      snapshot: 'assets/img/dialog/da-bubble.png',
      github: 'https://github.com/Marcel-Goehn/pokedex'
    }
  ]);
  dialogData$ = this.dialogData.asReadonly();


  changeIndex(i: number) {
    this.index.set(i);
  }


  incrementIndex() {
    debugger;
    this.index.update((num) => (num + 1) % this.dialogData().length);
  }
}

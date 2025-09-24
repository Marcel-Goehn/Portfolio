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
      github: 'https://github.com/Marcel-Goehn/Join-Dashboard',
      route: 'https://marcel-goehn.developerakademie.net/Join/'
    },
    {
      id: 2,
      title: 'El Pollo Loco',
      information: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      usedTech: ['JavaScript', 'HTML', 'CSS'],
      snapshot: 'assets/img/dialog/el-pollo-loco.png',
      github: 'https://github.com/Marcel-Goehn/El-Pollo-Loco',
      route: 'https://marcel-goehn.developerakademie.net/pollo-loco/'
    },
    {
      id: 3,
      title: 'Pokedex',
      information: 'This app is a dynamic Pokédex built with HTML, CSS and JavaScript. It fetches Pokémon data from an API and displays each creature with its name, image and type. Users can quickly search and explore different Pokémon in an interactive and responsive interface.',
      usedTech: ['JavaScript', 'HTML', 'CSS'],
      snapshot: 'assets/img/dialog/pokedex.png',
      github: 'https://github.com/Marcel-Goehn/pokedex',
      route: 'https://marcel-goehn.developerakademie.net/pokedex/'
    }
  ]);
  dialogData$ = this.dialogData.asReadonly();


  /**
   * It changes the index to show an other project
   * 
   * @param i - The index
   */
  onChangeIndex(i: number) {
    this.index.set(i);
  }


  /**
   * This method increments the index
   */
  onIncrementIndex() {
    this.index.update((num) => (num + 1) % this.dialogData().length);
  }
}

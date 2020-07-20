import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*
  Theme Toggling service that switches between light mode and darkmode
*/

@Injectable(
  {
    providedIn: 'root'    //make ThemeService a singleton
  }
)
export class ThemeService {

  private themeSource = new BehaviorSubject<string>("light-theme");
  currentTheme = this.themeSource.asObservable();

  constructor() {

  }

  private isNightmode: boolean = false;

  public toggleTheme(){

    if(this.isNightmode) {             //Nightmode ON
      this.isNightmode = false;
      this.themeSource.next("light-theme");
    }
    else {                             //Nightmode OFF
      this.isNightmode = true;
      this.themeSource.next("dark-theme");
    }
  }

  public getIsNightmode():boolean {
    return this.isNightmode;
  }

}

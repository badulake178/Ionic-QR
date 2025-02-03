import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  //Este servicio reliza el cambio de tema de la aplicación

  darkMode = new BehaviorSubject(false);

  constructor() { }

  //Esta funcion guarda el estado del tema en el local storage
  setInitialTheme(){
    let darkMode = JSON.parse(localStorage.getItem('darkMode'));
    if(darkMode){
      this.setTheme(darkMode);
    }else{
      this.setTheme(darkMode);

    }
  }

  setTheme(darkMode: boolean){
    if(darkMode){
      document.body.setAttribute('color-theme','dark');
    }
    else{
      document.body.setAttribute('color-theme','light');
    }

    this.darkMode.next(darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }
}

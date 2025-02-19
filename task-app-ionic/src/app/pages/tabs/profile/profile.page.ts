import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  standalone: false,
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUser();
  }


  getUser(){
    return this.user = this.utilsSvc.getElementFromLocalStorage('user');
  }

  signOuth() {
   this.utilsSvc.presentAlert({
    header: 'Cerrrar Sesión',
    message: '¿Quieres cerrar sesión?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',

      }, {
        text: 'Si, cerrar',
        handler: () => {
          this.firebaseSvc.signOuth();
        }
      }
    ]
  })

  }

}

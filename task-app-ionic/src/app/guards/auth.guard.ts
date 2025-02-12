import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  constructor(
    private firebaseScv: FirebaseService,
    private utilsSrv: UtilsService
  ){}

  //Esta funcion de Guard permite verificar la autenticacion del usuario.

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): MaybeAsync<GuardResult> {

      return this.firebaseScv.getAuthState().pipe(map(auth => {
        if(auth){
          return true;
        }
        else{
          this.utilsSrv.routerLink('/auth');
          return false;

        }
      }))


  }
}




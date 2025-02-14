import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  // ===== Loading =====

  // Visualizar
  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create();
    await loading.present();
  }

  // Ocultar
  async dismissLoading(){
    return await this.loadingController.dismiss();
  }

  // ===== LocalStorage =====
  // SET
  setElementInLocalstorage(key: string, element: any){
    return localStorage.setItem(key, JSON.stringify(element));
  }

  // GET
  getElementFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }

  // Presentar resultados
  async presentToast(opts?: ToastOptions){
    const toast = await this.toastController.create(opts);
    toast.present();
  }

  // ===== Router =====
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  // =========== Alerta ==============
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);


    await alert.present();
  }

  // =========== Modal =================
  // Presentar modal
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();

    const {data} = await modal.onWillDismiss();

    if(data){
      return data;
    }

  }

  // Eliminar Modal
  dismissModal(data?: any){
    this.modalController.dismiss(data);
  }

  getPercentage(task: Task){
    let completedItems = task.items.filter(item => item.completed).length;
    let totalItems = task.items.length;
    let percentage = (100 / totalItems) * completedItems;

    return parseInt(percentage.toString());
  }
}

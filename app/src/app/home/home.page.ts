import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  segment  = 'scan';
  qrText = '';

  constructor(
    private loadingController: LoadingController,
    private platform: Platform
  ) {}

  // ===== Capture HTML element, convert it to canvas and get an iamge =====
  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;

    html2canvas(element).then((canvas: HTMLCanvasElement)=>{

      if(this.platform.is('capacitor')) this.downloadImage(canvas);
      else this.downloadImage(canvas);
    })

  }

  // ===== Download the image web =====
  downloadImage(canvas: HTMLCanvasElement){
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }

  // ===== Download the image web =====
  async shareImage(canvas: HTMLCanvasElement){

    let base64 = canvas.toDataURL();
    let path = 'qr.png';

    const loading = await this.loadingController.create({spinner: 'crescent', });
    await loading.present();

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Documents
    }).then(async (res)=>{
      let uri = res.uri;
      await Share.share({
        url: uri
      });

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      })
    }).finally(()=>{

      loading.dismiss();
    });






  }

}

import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  segment  = 'scan';
  qrText = '';

  constructor() {}

  // ===== Capture HTML element, convert it to canvas and get an iamge =====
  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;

    html2canvas(element).then((canvas: HTMLCanvasElement)=>{
      this.downloadImage(canvas);
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

    await Filesystem.writeFile({
      path: 'secrets/text.txt',
      data: 'This is a test',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });


  }

}

import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  segment  = 'scan';
  qrText = '';
  scanResult = '';

  constructor(
    private loadingController: LoadingController,
    private platform: Platform,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners().then();
    }
  }

  // ===== Scan QR and save the result in 'scanResult' =====
  async startScan(){
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        LensFacing:LensFacing.Back
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data){
      this.scanResult = data?.barcode?.displayValue;

    }
  };

  // ===== Read QR from an image and save the result in 'scanResult' =====
  async readBarcodeFromImage(){

    const {files} = await FilePicker.pickImages();

    const path = files[0]?.path;
    if(!path) return;

    const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
      path,
      formats: [],
    });

    this.scanResult = barcodes[0].displayValue;

  };

  // ===== Capture HTML element, convert it to canvas and get an iamge =====
  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;

    html2canvas(element).then((canvas: HTMLCanvasElement)=>{

      if(this.platform.is('capacitor')){
        this.shareImage(canvas);
      }
      else {
        this.downloadImage(canvas);

      }
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

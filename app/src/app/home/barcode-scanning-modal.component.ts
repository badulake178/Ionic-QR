import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
  BarcodesScannedEvent,
} from '@capacitor-mlkit/barcode-scanning';
import { ModalController } from '@ionic/angular';
import { Torch } from '@capawesome/capacitor-torch';

@Component({
  standalone: false,
  selector: 'app-barcode-scanning',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar color="tertiary">
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div #square class="square"></div>
      <ion-fab
      *ngIf="isTorchAvailable"
      slot="fixed"
      horizontal="end"
       vertical="bottom">

        <ion-fab-button (click)="toggleTorch()">
          <ion-icon name="flashlight"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  `,
  styles: [
    `
      ion-content {
        --background: transparent;
      }
      .square {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 16px;
        width: 200px;
        height: 200px;
        border: 6px solid white;
        box-shadow: 0 0 0 4000px rgba(0, 0, 0, 0.3);
      }
    `,
  ],
})
export class BarcodeScanningModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public formats: BarcodeFormat[] = [BarcodeFormat.QrCode];
  @Input() public lensFacing: LensFacing = LensFacing.Back;

  @ViewChild('square') public squareElement?: ElementRef<HTMLDivElement>;

  public isTorchAvailable = false;
  private listener?: Promise<{ remove: () => void }>;

  constructor(private readonly ngZone: NgZone, private modalController: ModalController) {}

  public async ngOnInit(): Promise<void> {
    const { available } = await Torch.isAvailable();
    this.isTorchAvailable = available;
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.startScan();
    }, 250);
  }

  public ngOnDestroy(): void {
    this.stopScan();
  }

  public async closeModal(barcode?: Barcode): Promise<void> {
    this.modalController.dismiss({ barcode });
  }

  public async toggleTorch(): Promise<void> {
    await Torch.toggle();
  }

  private async startScan(): Promise<void> {
    document.querySelector('body')?.classList.add('barcode-scanning-active');

    this.listener = BarcodeScanner.addListener('barcodesScanned', async (event: BarcodesScannedEvent) => {
      this.ngZone.run(() => {
        this.listener?.then(l => l.remove());
        this.closeModal(event.barcodes[0]);
      });
    });

    await BarcodeScanner.startScan({ formats: this.formats, lensFacing: this.lensFacing });
  }

  private async stopScan(): Promise<void> {
    document.querySelector('body')?.classList.remove('barcode-scanning-active');
    await BarcodeScanner.removeAllListeners();
    await BarcodeScanner.stopScan();
  }
}

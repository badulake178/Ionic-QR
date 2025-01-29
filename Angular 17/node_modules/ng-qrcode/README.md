# Angular QR code generator
Easy to use AOT compatible QR code generator for your Angular (not compatible with AngularJS) project.

## Install
    npm install ng-qrcode --save

## Usage
```
import { QRCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    QRCodeModule
  ]
})
```
```
<qr-code [data]="'Yo world!'" [size]="200"></qr-code>
```

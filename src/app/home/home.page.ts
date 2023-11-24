import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Animation } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {
  BarcodeScanner,
  BarcodeFormat
} from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  qrData: string | undefined;

  barcodes: any[] = [];
  
  cursos: any [] = [];

  correUsuario = localStorage.getItem('credentials')||'';

  nombreAlumno = localStorage.getItem('nombre')||'';

  @ViewChild('modal', { static: true }) modal!: IonModal;
  state: any;
  user: any;
  
  @ViewChild('loginIcon', { read: ElementRef }) loginIcon!: ElementRef;

  private animation!: Animation;

  constructor(
    private activeroute: ActivatedRoute, 
    private router: Router, 
    private animationCtrl: AnimationController,
    private http: HttpClient,
    modalController: ModalController, private alertController: AlertController,
  ) 
  
  
  
  {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state['user'];
      console.log('User information in home page:', this.user);
    }
  }

  

  ngAfterViewInit() {
    const animation = this.animationCtrl.create()
      .addElement(this.loginIcon.nativeElement)
      .duration(5000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)', opacity: '0.8' },
        { offset: 0.25, transform: 'translateX(100px)', opacity: '0.4' },
        { offset: 0.50, transform: 'translateX(0px)', opacity: '0.8' },
        { offset: 0.75, transform: 'translateX(-100px)', opacity: '0.4' },
        { offset: 1, transform: 'translateX(0px)', opacity: '0.8' },
      ]);

    animation.play();
  }
  ngOnInit() {
    this.http.get<any[]>('https://1z3gscj2-8000.brs.devtunnels.ms/api/cursos/').subscribe(
      (cursos: any[]) => {
        this.cursos = cursos;
      },
      (error: any) => {
        console.error('Error al obtener la lista de cursos', error);
      }
    );
  }

  async scan(): Promise<any[]> {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    this.showScanResultAlert();
    return barcodes;
  }


  async scanQRCode(){
    
    this.qrData = "Qr escaneado correctamente, presiona OK para continuar.";

    return this.qrData;


  }

  async showScanResultAlert() {
    // Llamamos a la función para escanear el código QR
  const qrData = await this.scanQRCode();
  // Creamos la alerta con los datos del código QR
  const alert = await this.alertController.create({
    header: 'Escaneo exitoso',
    message: `${qrData}`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          // Acción a realizar al presionar "Cancelar"
          console.log('Operación cancelada');
        }
      },
      {
        text: 'OK',
        handler: () => {
          this.router.navigate(['/qr']);
          console.log('Operación después de presionar OK');
          // Puedes llamar a otra función aquí o ejecutar código adicional
        }
      }
    ]
  });

  // Mostramos la alerta
  await alert.present();
}
 public async ccc(): Promise <void>{
  await BarcodeScanner.installGoogleBarcodeScannerModule();
}
}


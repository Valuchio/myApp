import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  abrirCorreo() {
    // Dirección de correo electrónico y otros parámetros opcionales
    let destinatario = 'profesor@duocuc.cl';
    let asunto = 'Marcaje de asistencia';
    let cuerpo = 'Cuerpo del correo';

    // Construir el enlace de correo electrónico con la sintaxis "mailto"
    let mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    // Abrir la aplicación de correo electrónico predeterminada del usuario
    window.location.href = mailtoLink;
  }

  volver() {
    this.navCtrl.navigateForward('/home');
  }

  ngOnInit() {
  }

}

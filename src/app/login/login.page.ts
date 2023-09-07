import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  username!: string;
  password!: String;

  constructor(public alertController: AlertController) { }

  async login() {
    if (this.username && this.password) {
      // Mostrar un mensaje emergente con el nombre de usuario
      const alert = await this.alertController.create({
        header: 'Bienvenido',
        message: `Hola, ${this.username}! Has iniciado sesión.`,
        buttons: ['OK'],
      });

      await alert.present();
    } else {
      // Mostrar un mensaje de error si no se ingresaron credenciales
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, ingresa tu nombre de usuario y contraseña.',
        buttons: ['OK'],
      });

      await alert.present();
    }


    if (this.isNumeric(this.password.toString())) {
      // Aquí puedes agregar la lógica de autenticación
      console.log('Inicio de sesión exitoso');
    } else {
      console.log('La contraseña debe ser numérica');
    }
  }

  isNumeric(value: any): boolean {
    return !isNaN(value - parseFloat(value));
  }
  
  

}

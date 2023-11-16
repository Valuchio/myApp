import { Component,NgZone } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AUTService } from 'src/app/aut.service';
import { AlumnosService } from '../services/autenticacion.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    Gmail: "",         
    Contrasena: ""     
  };
  rememberMe!: boolean;

  constructor(private router: Router, private authService: AUTService, private api: AlumnosService, private storage: Storage,private ngZone: NgZone) {
    this.initStorage();
  }
  async initStorage() {
    // Crear la base de datos de almacenamiento
    this.storage = await this.storage.create();

    console.log('Storage está listo');

    // Puedes realizar operaciones de almacenamiento aquí
  }
 
  login() {
    this.api.getAlumnos().subscribe(
      (alumnos) => {
        // Resto del código...

        if (alumnos && alumnos.length > 0) {
          const usuario = this.user.Gmail.toLowerCase();
          const contrasena = this.user.Contrasena.toLowerCase();

          const alumno = alumnos.find((alumno) => alumno.Gmail.toLowerCase() === usuario || alumno.nombreAlumno.toLowerCase() === usuario);

          if (alumno && alumno.Contrasena.toLowerCase() === contrasena) {
            console.log('Autenticación exitosa');

            let navigationExtras: NavigationExtras = {
              state: {
                user: this.user,
                alumno: alumno
              }
            };

            this.router.navigate(['/home'], navigationExtras);

            // Mover la lógica de almacenamiento aquí, después de la autenticación exitosa
            if (this.rememberMe) {
              localStorage.setItem('credentials', JSON.stringify({ Gmail: this.user.Gmail, Contrasena: this.user.Contrasena }));
              console.log('Credenciales guardadas en localStorage');
            } else {
              // Si no está marcado, elimina las credenciales almacenadas
              localStorage.removeItem('credentials');
              console.log('Credenciales eliminadas de localStorage');
            }
          } else {
            console.log('Autenticación fallida: Credenciales incorrectas');
            this.router.navigate(['/login']);
          }
        } else {
          console.error('La respuesta de la API es un array vacío o nulo');
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error al obtener datos de la API', error);
        if (error.status === 401) {
          console.log('Error de autenticación: Credenciales incorrectas');
          this.router.navigate(['/login']);
        } else {
          console.error('Otro tipo de error:', error);
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
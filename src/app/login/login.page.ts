import { Component, NgZone } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AUTService } from 'src/app/aut.service';
import { AlumnosService } from '../services/autenticacion.service';
import { Storage } from '@ionic/storage';
import { GuardGuard } from '../guard/guard.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user = {
    Gmail: "",         
    Contrasena: "",
    nombreAlumno: ""     
  };
  rememberMe!: boolean;

  constructor(private router: Router, private authService: AUTService, public api: AlumnosService, private storage: Storage, private ngZone: NgZone,private auth: GuardGuard) {
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
          const nombreAl = this.user.nombreAlumno.toLowerCase();

          const alumno = alumnos.find((alumno) => alumno.Gmail.toLowerCase() === usuario || alumno.nombreAlumno.toLowerCase() === nombreAl);

          if (alumno && alumno.Contrasena.toLowerCase() === contrasena) {
            console.log('Autenticación exitosa');
            this.auth.setAuthenticationStatus(true);

            // Utiliza this.user.Gmail para obtener el correo electrónico del usuario
            const correoUsuario = this.user.Gmail;

            // Lógica de redirección basada en el correo electrónico
            this.redirigirSegunCorreo(correoUsuario);

            let navigationExtras: NavigationExtras = {
              state: {
                user: this.user,
                alumno: alumno
              }
            };   
            // Mover la lógica de almacenamiento aquí, después de la autenticación exitosa
            if (this.rememberMe) {
              localStorage.setItem('credentials',  this.user.Gmail);
              localStorage.setItem('nombre',  this.user.nombreAlumno);
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

  // Método para redirigir según el correo electrónico
  private redirigirSegunCorreo(correo: string) {
    // Obtener la parte del dominio del correo electrónico
    const dominio = correo.split('@')[1];

    // Lógica de redirección basada en la parte del dominio
    if (dominio === 'duoc.cl') {
      // Redirigir a una página específica para correos con dominio "duoc.cl"
      this.router.navigate(['/home']);
    }
    else if(dominio==='profesor.duoc.cl'){
      this.router.navigate(['/home-profesor']);
    }  
  }
}


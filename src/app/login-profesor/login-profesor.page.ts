import { Component, NgZone } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AUTService } from 'src/app/aut.service';
import { AlumnosService } from '../services/autenticacion.service';
import { Storage } from '@ionic/storage';
import { GuardGuard } from '../guard/guard.guard';

@Component({
  selector: 'app-login-profesor',
  templateUrl: './login-profesor.page.html',
  styleUrls: ['./login-profesor.page.scss'],
})
export class LoginProfesorPage  {
  profe = {
    Gmail: "",         
    Contrasena: ""     
  };
  rememberMe!: boolean;

  constructor(private router: Router, private authService: AUTService, private api: AlumnosService, private storage: Storage, private ngZone: NgZone,private auth: GuardGuard) {
    this.initStorage();
  }

  async initStorage() {
    // Crear la base de datos de almacenamiento
    this.storage = await this.storage.create();

    console.log('Storage está listo');

    // Puedes realizar operaciones de almacenamiento aquí
  }
 
  login() {
    this.api.getProfesores().subscribe(
      (profesores) => {
        // Resto del código...

        if (profesores && profesores.length > 0) {
          const usuario = this.profe.Gmail.toLowerCase();
          const contrasena = this.profe.Contrasena.toLowerCase();

          const profesor = profesores.find((profesor) => profesor.Gmail.toLowerCase() === usuario || profesor.nombreAlumno.toLowerCase() === usuario);

          if (profesor && profesor.Contrasena.toLowerCase() === contrasena) {
            console.log('Autenticación exitosa');

            // Utiliza this.user.Gmail para obtener el correo electrónico del usuario
            const correoUsuario = this.profe.Gmail;

            // Lógica de redirección basada en el correo electrónico
            this.redirigirSegunCorreo(correoUsuario);

            let navigationExtras: NavigationExtras = {
              state: {
                profe: this.profe,
                profesor: profesor
              }
            };   
            // Mover la lógica de almacenamiento aquí, después de la autenticación exitosa
            if (this.rememberMe) {
              localStorage.setItem('credentials', JSON.stringify({ Gmail: this.profe.Gmail, Contrasena: this.profe.Contrasena }));
              console.log('Credenciales guardadas en localStorage');
            } else {
              // Si no está marcado, elimina las credenciales almacenadas
              localStorage.removeItem('credentials');
              console.log('Credenciales eliminadas de localStorage');
            }
          } else {
            console.log('Autenticación fallida: Credenciales incorrectas');
            this.router.navigate(['/login-profesor']);
          }
        } else {
          console.error('La respuesta de la API es un array vacío o nulo');
          this.router.navigate(['/login-profesor']);
        }
      },
      (error) => {
        console.error('Error al obtener datos de la API', error);
        if (error.status === 401) {
          console.log('Error de autenticación: Credenciales incorrectas');
          this.router.navigate(['/login-profesor']);
        } else {
          console.error('Otro tipo de error:', error);
          this.router.navigate(['/login-profesor']);
        }
      }
    );
  }

  // Método para redirigir según el correo electrónico
  private redirigirSegunCorreo(correo: string) {
    // Obtener la parte del dominio del correo electrónico
    const dominio = correo.split('@')[1];

    // Lógica de redirección basada en la parte del dominio
    if (dominio === 'profesor.duoc.cl') {
      // Redirigir a una página específica para correos con dominio "profesor.duoc.cl"
      this.router.navigate(['/home-profesor']);
}
  }
}
  



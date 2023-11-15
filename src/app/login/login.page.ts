import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AUTService } from 'src/app/aut.service';
import { AlumnosService } from '../services/autenticacion.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
    user = {
    usuario:"",
    password:""
      }
  
  
      constructor(private router: Router, private authService: AUTService, private api:AlumnosService) {}

      login(){
        this.api.getAlumnos().subscribe((res)=> {
          console.log(res)
        })
      }





      /*login() {
        if (this.authService.login(this.user.usuario, this.user.password)) {
          let navigationExtras: NavigationExtras = {
            state: { user: this.user }
          };
          this.router.navigate(['/home'], navigationExtras);
        } else {
          this.router.navigate(['/login']);
        }
      }*/
    
    }

  
  

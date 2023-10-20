import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AUTService } from 'src/app/aut.service';

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
  
  
      constructor(private router: Router, private authService: AUTService) {}

      login() {
        if (this.authService.login(this.user.usuario, this.user.password)) {
          let navigationExtras: NavigationExtras = {
            state: { user: this.user }
          };
          this.router.navigate(['/home'], navigationExtras);
        } else {
          this.router.navigate(['/login']);
        }
      }
    
    }

  
  

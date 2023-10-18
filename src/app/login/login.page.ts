import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

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
  
  
    constructor(private router: Router){ }
  
    IralHome(){
    let navigationExtras: NavigationExtras = {
      state: {user: this.user}
        };
    this.router.navigate(['/home'],navigationExtras);
    }
    

  

  
  }

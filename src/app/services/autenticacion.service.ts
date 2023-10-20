import { Injectable } from '@angular/core';
import {Storage}  from '@ionic/storage-angular'
import { Router } from '@angular/router';


interface user {
  usuario:string;
  password:string;
    }

  @Injectable({
    providedIn:'root'
  })

  
export class AutenticacionService {
public autenticado!:boolean;

private local!: Storage;

  constructor(private storage: Storage,private route:Router) { 
    this.init()

  }
//AL iniciar el modulo iniciamos el storage y guardamos la instancia en una variable local llamada local
  async init (){
    const storage = await this.storage.create();
    this.local=storage;
  }

  //funcion registrar usuario
  async register (usuario:string,password:string): Promise<Boolean>{
    const users=await
  }

}

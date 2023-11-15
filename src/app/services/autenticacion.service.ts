import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { IonicStorageModule } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    //await this.storage.create();
  }

  getAlumnos(): Observable<any[]> {
    // Intenta obtener los datos de localStorage
    return new Observable((observer) => {
      
          // Si no hay datos en localStorage, realiza la solicitud a la API
          this.http.get<any[]>(`${this.apiUrl}/alumnos`).subscribe((apiData) => {
            // Guarda los datos en localStorage para futuras consultas
            observer.next(apiData);
            observer.complete();
          });
        })
  }
}

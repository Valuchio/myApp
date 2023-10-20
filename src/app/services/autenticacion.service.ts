import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  getAlumnos(): Observable<any[]> {
    // Intenta obtener los datos de localStorage
    return new Observable((observer) => {
      this.storage.get('alumnos').then((cachedData) => {
        if (cachedData) {
          observer.next(cachedData);
          observer.complete();
        } else {
          // Si no hay datos en localStorage, realiza la solicitud a la API
          this.http.get<any[]>(`${this.apiUrl}/POSTMAN/alumnos`).subscribe((apiData) => {
            // Guarda los datos en localStorage para futuras consultas
            this.storage.set('alumnos', apiData);
            observer.next(apiData);
            observer.complete();
          });
        }
      });
    });
  }
}
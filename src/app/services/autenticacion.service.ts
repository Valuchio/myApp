import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { IonicStorageModule } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private apiUrl = 'https://4wn9d2m5-8000.brs.devtunnels.ms/api';

  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    //await this.storage.create();
  }

  getAlumnos(): Observable<any[]> {
    return new Observable((observer) => {
      this.http.get<any[]>(`${this.apiUrl}/alumnos/`).subscribe(
        (apiData) => {
          observer.next(apiData);
          observer.complete();
        },
        (error) => {
          console.error('Error en la solicitud HTTP:', error);
          observer.error(error);
        }
      );
    });
  }
  getProfesores(): Observable<any[]> {
    return new Observable((observer) => {
      this.http.get<any[]>(`${this.apiUrl}/profesores/`).subscribe(
        (apiData) => {
          observer.next(apiData);
          observer.complete();
        },
        (error) => {
          console.error('Error en la solicitud HTTP:', error);
          observer.error(error);
        }
      );
    });
  }

  
}

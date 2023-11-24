import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QRPage implements OnInit {

  cursos: any [] = [];
  correoAlumno = localStorage.getItem('credentials') || '';

  constructor(private navCtrl: NavController, private http: HttpClient) {}
  


  async enviarCorreo( destinatarioAlumno: string) {

    console.log(destinatarioAlumno);
    const asunto = 'Confirmar Asistencia';

    const cuerpo = `Correo de confirmacion Que ah asistido a esta clase 
    
    
    `;
  
    const mailtoLink = `mailto:${destinatarioAlumno}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  

    window.location.href = mailtoLink;
  }

  ngOnInit() {
    this.http.get<any[]>('https://4wn9d2m5-8000.brs.devtunnels.ms/api/cursos/').subscribe(
      (cursos: any[]) => {
        this.cursos = cursos;
      },
      (error: any) => {
        console.error('Error al obtener la lista de cursos', error);
      }
    );
  }

}



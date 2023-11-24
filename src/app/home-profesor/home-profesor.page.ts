import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Animation } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.page.html',
  styleUrls: ['./home-profesor.page.scss'],
})
export class HomeProfesorPage implements OnInit {

  cursos: any [] = [];

  @ViewChild('modal', { static: true }) modal!: IonModal;
  state: any;
  profe: any;
  correUsuario = localStorage.getItem('credentials')||'';

  nombreProfesor = localStorage.getItem('nombre')||'';


  @ViewChild('loginIcon', { read: ElementRef }) loginIcon!: ElementRef;

  private animation!: Animation;

  constructor(
    private activeroute: ActivatedRoute, 
    private router: Router, 
    private animationCtrl: AnimationController,
    private http: HttpClient,
    modalController: ModalController
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.profe = navigation.extras.state['profe'];
      console.log('User information in home page:', this.profe);
    }
  }

  

  ngAfterViewInit() {
    const animation = this.animationCtrl.create()
      .addElement(this.loginIcon.nativeElement)
      .duration(5000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)', opacity: '0.8' },
        { offset: 0.25, transform: 'translateX(100px)', opacity: '0.4' },
        { offset: 0.50, transform: 'translateX(0px)', opacity: '0.8' },
        { offset: 0.75, transform: 'translateX(-100px)', opacity: '0.4' },
        { offset: 1, transform: 'translateX(0px)', opacity: '0.8' },
      ]);

    animation.play();
  }
  ngOnInit() {
    this.http.get<any[]>('https://1z3gscj2-8000.brs.devtunnels.ms/api/cursos/').subscribe(
      (cursos: any[]) => {
        this.cursos = cursos;
      },
      (error: any) => {
        console.error('Error al obtener la lista de cursos', error);
      }
    );
  }
}

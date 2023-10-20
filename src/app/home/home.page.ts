import { Component,ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import type { IonModal } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { IonAvatar } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  state:any;
  user:any;
  
  @ViewChild('loginIcon', { read: ElementRef }) loginIcon!: ElementRef;

  private animation!: Animation;
  constructor(private activeroute: ActivatedRoute, private router: Router,private animationCtrl: AnimationController,modalController: ModalController) {
    this.activeroute.queryParams.subscribe(params => {
      this.state=this.router.getCurrentNavigation()?.extras.state;
        this.user = this.state.user
        console.log(this.user);
      })
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
    ])


  animation.play();
}

}


import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QRPage } from './qr.page';
import { IonicModule } from '@ionic/angular';

describe('QRPage', () => {
  let component: QRPage;
  let fixture: ComponentFixture<QRPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QRPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});


import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QrimgPage } from './qrimg.page';
import { IonicModule } from '@ionic/angular';

describe('QrimgPage', () => {
  let component: QrimgPage;
  let fixture: ComponentFixture<QrimgPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QrimgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrimgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});

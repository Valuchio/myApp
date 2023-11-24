import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RcontrasennaPage } from './rcontrasenna.page';
import { IonicModule } from '@ionic/angular';

describe('RcontrasennaPage', () => {
  let component: RcontrasennaPage;
  let fixture: ComponentFixture<RcontrasennaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RcontrasennaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RcontrasennaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});

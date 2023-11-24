import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeProfesorPage } from './home-profesor.page';
import { IonicModule } from '@ionic/angular';

describe('HomeProfesorPage', () => {
  let component: HomeProfesorPage;
  let fixture: ComponentFixture<HomeProfesorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProfesorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginProfesorPage } from './login-profesor.page';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AlumnosService } from '../services/autenticacion.service';
describe('LoginProfesorPage', () => {
  let component: LoginProfesorPage;
  let fixture: ComponentFixture<LoginProfesorPage>;
  let mockRouter: any;
  let mockApiService: any;
  let mockStorage: any;
  beforeEach(
    waitForAsync(() => {
      mockRouter = {
        navigate: jasmine.createSpy('navigate')
      };

      mockApiService = {
        getAlumnos: jasmine.createSpy('getAlumnos').and.returnValue(of([]))
      };

      mockStorage = {
        create: jasmine.createSpy('create').and.returnValue(Promise.resolve())
      };

      TestBed.configureTestingModule({
        declarations: [LoginProfesorPage],
        imports: [IonicModule.forRoot(), FormsModule],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: AlumnosService, useValue: mockApiService },
          { provide: Storage, useValue: mockStorage }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginProfesorPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize storage', async () => {
    await component.initStorage();
    expect(mockStorage.create).toHaveBeenCalled();
  });

  it('should redirect on successful login', () => {
    const mockAlumno = { Gmail: 'test@duoc.cl', password: 'password' };
    spyOn(component.api, 'getAlumnos').and.returnValue(of([mockAlumno]));

    component.profe = { Gmail: 'test@duoc.cl', Contrasena: 'password',nombreProfesor:'nombre' };
    component.rememberMe = true;

    component.login();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/inicio']);
    expect(localStorage.getItem('credentials')).toBeTruthy();
  });

  it('should handle unsuccessful login', () => {
    spyOn(component.api, 'getAlumnos').and.returnValue(of([]));

    component.profe = { Gmail: 'nonexistent@duoc.cl', Contrasena: 'wrongpassword',nombreProfesor:'null' };
    component.login();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    expect(localStorage.getItem('credentials')).toBeNull();
  });
});

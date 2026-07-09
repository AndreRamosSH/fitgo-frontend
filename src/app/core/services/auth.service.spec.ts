import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login and save user/token to localStorage', () => {
    const mockResponse = {
      token: 'fake-jwt-token',
      nombre: 'Juan',
      apellido: 'Perez',
      correo: 'juan@fitgo.com',
      rol: 'MIEMBRO',
      telefono: '999888777'
    };

    service.login({ correo: 'juan@fitgo.com', password: 'password123' }).subscribe(res => {
      expect(res).toBeTruthy();
      expect(localStorage.getItem('fitgo_token')).toBe('fake-jwt-token');
      expect(JSON.parse(localStorage.getItem('fitgo_user') || '{}').nombre).toBe('Juan');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout and clear localStorage', () => {
    localStorage.setItem('fitgo_token', 'token');
    localStorage.setItem('fitgo_user', JSON.stringify({ nombre: 'Juan' }));

    service.logout();

    expect(localStorage.getItem('fitgo_token')).toBeNull();
    expect(localStorage.getItem('fitgo_user')).toBeNull();
  });
});

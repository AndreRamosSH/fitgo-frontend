import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const dummyUrlTree = {} as UrlTree;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const rSpy = jasmine.createSpyObj('Router', ['createUrlTree']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: rSpy }
      ]
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    routerSpy.createUrlTree.and.returnValue(dummyUrlTree);
  });

  it('should allow activation when user is logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() => 
      authGuard({} as ActivatedRouteSnapshot, null as any)
    );

    expect(result).toBeTrue();
  });

  it('should redirect to /login when user is not logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() => 
      authGuard({} as ActivatedRouteSnapshot, null as any)
    );

    expect(result).toBe(dummyUrlTree);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});

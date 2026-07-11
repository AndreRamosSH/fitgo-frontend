import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { roleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';

describe('roleGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const dummyUrlTree = {} as UrlTree;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getRole']);
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

  it('should allow activation when user is logged in and has expected role', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getRole.and.returnValue('ADMIN');

    const route = {
      data: { expectedRoles: ['ADMIN', 'ENTRENADOR'] }
    } as any as ActivatedRouteSnapshot;

    const result = TestBed.runInInjectionContext(() => 
      roleGuard(route, null as any)
    );

    expect(result).toBeTrue();
  });

  it('should redirect to role dashboard when user has different role', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getRole.and.returnValue('MIEMBRO');

    const route = {
      data: { expectedRoles: ['ADMIN'] }
    } as any as ActivatedRouteSnapshot;

    const result = TestBed.runInInjectionContext(() => 
      roleGuard(route, null as any)
    );

    expect(result).toBe(dummyUrlTree);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/miembro']);
  });
});

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TokenService } from '../token-svc/token-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'] as string;
    const userRole = this.tokenService.getUserRole();

    if (!userRole || userRole !== requiredRole) {
      // Redirect to a default route if there's no access
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

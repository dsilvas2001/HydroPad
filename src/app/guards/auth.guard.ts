import { CanActivateFn, Router } from '@angular/router';
import { AuthservicesService } from '../auth/Services/authservices.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const authService =  inject(AuthservicesService);

   const router = inject(Router);

    if (authService.getAuthToken()) {
      // Si hay un usuario autenticado, permite la navegación
      return true;
    } else {
      // Si no hay un usuario autenticado, redirige al login
      return router.parseUrl('/auth/login');
    }
};

export const publicGuard: CanActivateFn = () => {

  const authService =  inject(AuthservicesService);

   const router = inject(Router);

   if (authService.getAuthToken()) {
    // Si hay un usuario autenticado, permite la navegación
    return router.parseUrl('/pagina-user/Homeuser');
  } else {
    // Si no hay un usuario autenticado, redirige al login
    return true;
  }
};

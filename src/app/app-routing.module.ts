import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, publicGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path:'pageprincipal',
    // canActivate : [authGuard],
    loadChildren: () => import('./pageprincipal/pageprincipal.module').then(m=>m.PageprincipalModule),
  },
  {
    path:'auth',
    canActivate : [publicGuard],
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'pagenotfound',
    loadChildren: () => import('./pagenotfound/pagenotfound.module').then(m=>m.PagenotfoundModule)
  },
  {
    path:'pagina-user',
    canActivate : [authGuard],
    loadChildren: () => import('./pagina-user/pagina-user.module').then(m=>m.PaginaUserModule)
  },
  {
    path:'**',
    redirectTo: 'pageprincipal'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
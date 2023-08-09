import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'pageprincipal',
    loadChildren: () => import('./pageprincipal/pageprincipal.module').then(m=>m.PageprincipalModule)
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'pagenotfound',
    loadChildren: () => import('./pagenotfound/pagenotfound.module').then(m=>m.PagenotfoundModule)
  },
  {
    path:'pagina-user',
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
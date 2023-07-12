import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'Home', component: PageHomeComponent },
      { path: '**', redirectTo: 'Home' },
    ],
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageprincipalRoutingModule {}

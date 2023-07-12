import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404FoundComponent } from './pages/page404-found/page404-found.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '404-ERROR', component: Page404FoundComponent },
      { path: '**', redirectTo: '404-ERROR' },
    ],
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagenotfoundRoutingModule { }

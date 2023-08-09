import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuuserComponent } from './pages/menuuser/menuuser.component';
import { DashboardCalidadAguaComponent } from './pages/dashboard-calidad-agua/dashboard-calidad-agua.component';
import { ReportDiarioComponent } from './pages/report-diario/report-diario.component';
import { PanelConversemosComponent } from './pages/panel-conversemos/panel-conversemos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'MenuUser', component: MenuuserComponent },
      { path: 'HomeUser', component: DashboardCalidadAguaComponent },
      { path: 'ReporteDiarioCalidadAgua', component: ReportDiarioComponent },
      { path: 'PanelConversemos', component: PanelConversemosComponent },
      { path: '**', redirectTo: 'MenuUser' },
    ],
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaUserRoutingModule { }

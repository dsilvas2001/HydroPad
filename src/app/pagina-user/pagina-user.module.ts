import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaUserRoutingModule } from './pagina-user-routing.module';
import { MenuuserComponent } from './pages/menuuser/menuuser.component';
import { DashboardCalidadAguaComponent } from './pages/dashboard-calidad-agua/dashboard-calidad-agua.component';
import { EncabezadodashboardComponent } from './pages/encabezadodashboard/encabezadodashboard.component';
import { ReportDiarioComponent } from './pages/report-diario/report-diario.component';
import { PanelConversemosComponent } from './pages/panel-conversemos/panel-conversemos.component';


@NgModule({
  declarations: [
    MenuuserComponent,
    DashboardCalidadAguaComponent,
    EncabezadodashboardComponent,
    ReportDiarioComponent,
    PanelConversemosComponent
  ],
  imports: [
    CommonModule,
    PaginaUserRoutingModule
  ]
})
export class PaginaUserModule { }

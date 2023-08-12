import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

import { PaginaUserRoutingModule } from './pagina-user-routing.module';
import { MenuuserComponent } from './pages/menuuser/menuuser.component';
import { DashboardCalidadAguaComponent } from './pages/dashboard-calidad-agua/dashboard-calidad-agua.component';
import { EncabezadodashboardComponent } from './pages/encabezadodashboard/encabezadodashboard.component';
import { ReportDiarioComponent } from './pages/report-diario/report-diario.component';
import { PanelConversemosComponent } from './pages/panel-conversemos/panel-conversemos.component';
import { PanelPerfilComponent } from './pages/panel-perfil/panel-perfil.component';

@NgModule({
  declarations: [
    MenuuserComponent,
    DashboardCalidadAguaComponent,
    EncabezadodashboardComponent,
    ReportDiarioComponent,
    PanelConversemosComponent,
    PanelPerfilComponent,
  ],
  imports: [
    CommonModule,
    PaginaUserRoutingModule,
    FormsModule // Agrega FormsModule aquí
  ]
})
export class PaginaUserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageprincipalRoutingModule } from './pageprincipal-routing.module';
import { PageHomeComponent } from './pages/page-home/page-home.component';


@NgModule({
  declarations: [
    PageHomeComponent
  ],
  imports: [
    CommonModule,
    PageprincipalRoutingModule
  ]
})
export class PageprincipalModule { }

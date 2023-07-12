import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagenotfoundRoutingModule } from './pagenotfound-routing.module';
import { Page404FoundComponent } from './pages/page404-found/page404-found.component';


@NgModule({
  declarations: [
    Page404FoundComponent
  ],
  imports: [
    CommonModule,
    PagenotfoundRoutingModule
  ]
})
export class PagenotfoundModule { }

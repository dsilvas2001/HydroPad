import { Component, AfterViewInit, Renderer2,NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';



@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css','./CSS/Contact.css','./CSS/Icono.css','./CSS/CardCreadores.css','./CSS/Services.css','./CSS/header.css','./CSS/buttonDescarga.css', './CSS/hallazgoClave.css']})



export class PageHomeComponent implements AfterViewInit{

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const arribaSpan = this.renderer.selectRootElement('.arriba');
    this.renderer.listen(arribaSpan, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

}
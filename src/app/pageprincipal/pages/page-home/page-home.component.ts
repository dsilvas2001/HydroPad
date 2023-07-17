import { Component, AfterViewInit, Renderer2,NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';



@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css','./CSS/Contact.css','./CSS/Icono.css','./CSS/CardCreadores.css','./CSS/Services.css','./CSS/header.css']})



export class PageHomeComponent implements AfterViewInit{

  constructor(private renderer: Renderer2) {}












  ngAfterViewInit() {
    const script = this.renderer.createElement('script');
    script.text = `
    const menu = document.querySelector('.nav__menu');
    const menuList = document.querySelector('.nav__list');
    const links = document.querySelectorAll('.nav__link');
    
    const modal = document.querySelector('.modal');
    const modalButtonClose = document.querySelector('.modal__close');
    
    menu.addEventListener('click', function () {
        menuList.classList.toggle('nav__list--show');
    });
    
    links.forEach(function (link) {
        link.addEventListener('click', function () {
            menuList.classList.remove('nav__list--show');
        });
    });
    
    // MODAL
    
    // Se ejecuta cuando se carga el DOM
    document.addEventListener('DOMContentLoaded', () => {
        modal.classList.add('modal--visible');
        modalButtonClose.addEventListener('click', () => {
            modal.classList.remove('modal--visible');
        });
    });
    `;
    this.renderer.appendChild(document.body, script);
  }
  
 

}
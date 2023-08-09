import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var ApexCharts: any; // Declaración de la variable global ApexCharts
declare var jQuery: any; // Declaración de la variable global jQuery

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.component.html',
  styleUrls: ['./menuuser.component.css', '../CSS/submenu.css', '../CSS/menu.css', '../CSS/panel.css' , '../CSS/navbar.css', '../CSS/encabezado.css', '../CSS/cards.css', '../CSS/estructura.css',  '../CSS/responsive.css' ]
})
export class MenuuserComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Código JavaScript adaptado
    const sidebarSubmenus: NodeListOf<Element> = this.elementRef.nativeElement.querySelectorAll('.sidebar-submenu');
    sidebarSubmenus.forEach(e => {
      (e.querySelector('.sidebar-menu-dropdown') as HTMLElement).onclick = (event: Event) => {
        event.preventDefault();
        (e.querySelector('.sidebar-menu-dropdown .dropdown-icon') as HTMLElement).classList.toggle('active');

        let dropdown_content = e.querySelector('.sidebar-menu-dropdown-content') as HTMLElement;
        let dropdown_content_lis = dropdown_content.querySelectorAll('li');
        let active_height = dropdown_content_lis[0].clientHeight * dropdown_content_lis.length;
        dropdown_content.classList.toggle('active');
        dropdown_content.style.height = dropdown_content.classList.contains('active') ? active_height + 'px' : '0';
      };
    });

    let category_options = {
      series: [44, 55, 41, 17],
      labels: ['Cloths', 'Devices', 'Bags', 'Watches'],
      chart: {
        type: 'donut',
      },
      colors: ['#6ab04c', '#2980b9', '#f39c12', '#d35400']
    };

    let category_chart = new ApexCharts(document.querySelector("#category-chart"), category_options);
    category_chart.render();

    let customer_options = {
      series: [{
        name: "Store Customers",
        data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
      },{
        name: "Online Customers",
        data: [20, 30, 10, 20, 16, 40, 20, 51, 10]
      }],
      colors: ['#6ab04c', '#2980b9'],
      chart: {
        height: 350,
        type: 'line',
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      legend: {
        position: 'top'
      }
    };

    let customer_chart = new ApexCharts(document.querySelector("#customer-chart"), customer_options);
    customer_chart.render();

    const setDarkChart = (dark: boolean) => {
      let theme = {
        theme: {
          mode: dark ? 'dark' : 'light'
        }
      };

      customer_chart.updateOptions(theme);
      category_chart.updateOptions(theme);
    };

    // Código para el botón de offcanvas
    (function($) {
      'use strict';
      $(function() {
        $('[data-toggle="offcanvas"]').on("click", function() {
          $('.sidebar-offcanvas').toggleClass('active');
        });
      });
    })(jQuery);
    
    // BotonParaActivar
    const messageButton = this.elementRef.nativeElement.querySelector('#messageDropdown');
    // Contenedor
    const messageMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu-right');

    messageButton.addEventListener('click', () => {
      const isExpanded = messageMenu.classList.contains('show');
      messageMenu.classList.toggle('show', !isExpanded);
      messageButton.setAttribute('aria-expanded', String(!isExpanded));
    });
    // Perfil Usuario
    const messagePerfil = this.elementRef.nativeElement.querySelector('#profileDropdown');
    const messageMenuPerfil = this.elementRef.nativeElement.querySelector('#ShowPerfil');

    messagePerfil.addEventListener('click', () => {
      const isExpandedPerfil = messageMenuPerfil.classList.contains('show');
      messageMenuPerfil.classList.toggle('show', !isExpandedPerfil);
      messagePerfil.setAttribute('aria-expanded', String(!isExpandedPerfil));
    });

    // Notificaciones HydroPad
    const messageNotificaciones = this.elementRef.nativeElement.querySelector('#notificationDropdown');
    const messageMenuNotificaciones = this.elementRef.nativeElement.querySelector('#ShowNotificaciones');

    messageNotificaciones.addEventListener('click', () => {
      const isExpandedNotificaciones = messageMenuNotificaciones.classList.contains('show');
      messageMenuNotificaciones.classList.toggle('show', !isExpandedNotificaciones);
      messageNotificaciones.setAttribute('aria-expanded', String(!isExpandedNotificaciones));
    });
    
  }
}

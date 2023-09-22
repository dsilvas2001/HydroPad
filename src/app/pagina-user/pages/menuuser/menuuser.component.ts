import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthservicesService } from 'src/app/auth/Services/authservices.service';
import { Usuario } from 'src/app/models/usermodels';
import { UserfiretoolsService } from 'src/app/serverFirebaseTools/userfiretools.service';

// declare var ApexCharts: any;
 // Declaración de la variable global ApexCharts
declare var jQuery: any; // Declaración de la variable global jQuery


import Swal from 'sweetalert2'
import { UserefreshService } from '../../userservices/userefresh.service';

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.component.html',
  styleUrls: ['./menuuser.component.css', '../CSS/submenu.css', '../CSS/menu.css', '../CSS/panel.css' , '../CSS/navbar.css', '../CSS/encabezado.css', '../CSS/cards.css', '../CSS/estructura.css',  '../CSS/responsive.css' ]
})
export class MenuuserComponent implements OnInit, AfterViewInit {

  nameUserHydropad: string = '';
  usuario: Usuario

  constructor(private elementRef: ElementRef,private auth: AuthservicesService,private userProfileService: UserfiretoolsService,private userService: UserefreshService) {
    this.usuario = {
      userId: '',
      nombre: '',
      email: ''
    };
  }



  ngOnInit(): void {

   }

  


  logoutUser(){

    Swal.fire({
      title: 'Deseas Cerrar Sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.logout();
        this.userService.clearUserData();
        Swal.fire(
          'Correctamente!',
          'Se ha cerrado sesión correctamente.',
          'success'
        )
      }
    })
  } 


  


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

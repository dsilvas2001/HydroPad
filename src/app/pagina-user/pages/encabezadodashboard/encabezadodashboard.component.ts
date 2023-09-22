import { Component, OnInit } from '@angular/core';
import { AuthservicesService } from 'src/app/auth/Services/authservices.service';
import { Usuario } from 'src/app/models/usermodels';
import { UserfiretoolsService } from 'src/app/serverFirebaseTools/userfiretools.service';
import { UserefreshService } from '../../userservices/userefresh.service';

import Swal from 'sweetalert2'
     

@Component({
  selector: 'app-encabezadodashboard',
  templateUrl: './encabezadodashboard.component.html',
  styleUrls: ['./encabezadodashboard.component.css', '../CSS/submenu.css', '../CSS/menu.css', '../CSS/panel.css' , '../CSS/navbar.css', '../CSS/encabezado.css', '../CSS/cards.css', '../CSS/estructura.css',  '../CSS/responsive.css']
})
export class EncabezadodashboardComponent implements OnInit{

  usuario: Usuario

  constructor(private auth: AuthservicesService,private userProfileService: UserfiretoolsService,private userService: UserefreshService) {
    this.usuario = {
      userId: '',
      nombre: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.userProfileService.ensureUserDataLoaded().subscribe();
    this.userService.currentUser.subscribe(user => {
      this.usuario = user;
    }); 
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



  refreshWebsites(): void {
    window.location.reload();
  }




}

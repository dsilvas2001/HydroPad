import { Component, OnInit } from '@angular/core';

import { AuthservicesService } from 'src/app/auth/Services/authservices.service';
import { Usuario } from 'src/app/models/usermodels';
import { UserfiretoolsService } from 'src/app/serverFirebaseTools/userfiretools.service';



import Swal from 'sweetalert2'
import { UserefreshService } from '../../userservices/userefresh.service';



// IMPORTACION DE PRUEBA

import { switchMap } from 'rxjs/operators';
import { BackuserService } from 'src/app/BackupPgAdmin/ServicesBack/backuser.service';

@Component({
  selector: 'app-panel-perfil',
  templateUrl: './panel-perfil.component.html',
  styleUrls: ['./panel-perfil.component.css', '../CSS/submenu.css', '../CSS/menu.css', '../CSS/panel.css' , '../CSS/navbar.css', '../CSS/encabezado.css', '../CSS/cards.css', '../CSS/estructura.css',  '../CSS/responsive.css']
})
export class PanelPerfilComponent implements OnInit{
  nameUserHydropad: string = '';
  backnameUserHydropad: string = '';
  emailUserHydropad: string = '';
  iduser: string = '';
  editarHabilitado: boolean = false; // Inicialmente deshabilitado
  checkboxValue: boolean = false;

  constructor(private auth: AuthservicesService,private userProfileService: UserfiretoolsService, private userService: UserefreshService, private backUserService: BackuserService) { 
  }


  ngOnInit(): void {
    this.retornarDatos();
  }

retornarDatos()
{
  this.userProfileService.ensureUserDataLoaded().subscribe(data => {
    this.nameUserHydropad = data.nombre;
    this.backnameUserHydropad = data.nombre;
    this.emailUserHydropad = data.email;
    this.iduser = data.userId;
  });
}
editProfile()
{
  if(this.nameUserHydropad ==  this.backnameUserHydropad || this.nameUserHydropad == "")
  {
    this.validDateprofile ();
    return;
  }
  console.log(this.iduser);

  // this.userProfileService.updateUserName(this.iduser, this.nameUserHydropad)

  this.backUserService.updateUser(this.iduser, this.nameUserHydropad)

    .pipe(
      // Solicitamos de nuevo los datos actualizados para asegurarnos que refleje los cambios en el backend.
      switchMap(() => this.userProfileService.retrieveUserData())
    )
    .subscribe({
      next: (user: Usuario) => {
        // Actualizamos la información en el servicio de refresco.
        this.userService.updateUser(user);
        Swal.fire('Éxito', 'Nombre actualizado con éxito', 'success');
      },
      error: (error: any) => {
        Swal.fire('Error', 'Error al actualizar el nombre', 'error');
      }
    });


}




validDateprofile (){
  Swal.fire({
    title: 'Advertencia',
    text: "No hay datos editables!",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Entendido!'
  })
   }




  toggleCheckbox() {
    if (this.nameUserHydropad === '') {
      this.espacioenblancosNombre();
      this.nameUserHydropad = this.backnameUserHydropad;
      this.editarHabilitado = !this.editarHabilitado;
      return;
    }
    this.editarHabilitado = !this.editarHabilitado;
  }

  espacioenblancosNombre(){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Ingrese el Nombre!",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido!'
    })
     }







  
  recordarPassword() {
    Swal.fire({
      title: 'Introduce tu Email para restablecer tu contraseña:',
      input: 'email',
      inputValue: this.emailUserHydropad, // Valor por defecto
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return this.auth.forgotPassword(email)
          .then(() => {
            return true; // Indica que la operación fue exitosa
          })
          .catch(() => {
            Swal.showValidationMessage('El correo electrónico ingresado no es válido o no está registrado.');
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Correo enviado',
          text: 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  


}

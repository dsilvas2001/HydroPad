import { Component, OnInit } from '@angular/core';

import { AuthservicesService } from 'src/app/auth/Services/authservices.service';



import Swal from 'sweetalert2'



@Component({
  selector: 'app-panel-perfil',
  templateUrl: './panel-perfil.component.html',
  styleUrls: ['./panel-perfil.component.css', '../CSS/submenu.css', '../CSS/menu.css', '../CSS/panel.css' , '../CSS/navbar.css', '../CSS/encabezado.css', '../CSS/cards.css', '../CSS/estructura.css',  '../CSS/responsive.css']
})
export class PanelPerfilComponent implements OnInit{
  nameUserHydropad: string = '';
  editarHabilitado: boolean = false; // Inicialmente deshabilitado
  checkboxValue: boolean = false;

  constructor(private auth: AuthservicesService) { 
  }

  ngOnInit(): void {
    // Coloca cualquier lógica de inicialización necesaria aquí
  }
  toggleCheckbox() {
    if (this.nameUserHydropad === '' && this.editarHabilitado) {
      this.checkboxValue = true;
      this.espacioenblancosNombre();
      return;
    }
    
    this.checkboxValue = false;
    this.editarHabilitado = !this.editarHabilitado;
  }
  

  habilitarEdicion() {
    this.checkboxValue=false;

    if (this.nameUserHydropad === '' && this.editarHabilitado) {
      this.checkboxValue=true;
      console.log(this.checkboxValue);
      this.espacioenblancosNombre();
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
      inputValue: 'donaldsilva01@gmail.com', // Valor por defecto
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

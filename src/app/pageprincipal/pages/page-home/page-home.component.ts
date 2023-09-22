import { Component, AfterViewInit, Renderer2,NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import emailjs,{ EmailJSResponseStatus } from 'emailjs-com';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css','./CSS/Contact.css','./CSS/Icono.css','./CSS/CardCreadores.css','./CSS/Services.css','./CSS/header.css','./CSS/buttonDescarga.css', './CSS/hallazgoClave.css', './CSS/buttonIniciarSesion.css']})



export class PageHomeComponent implements AfterViewInit{

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const arribaSpan = this.renderer.selectRootElement('.arriba');
    this.renderer.listen(arribaSpan, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  scrollToSectionDesplzamiento(tiposeccion: string) {
    const section = document.querySelector(tiposeccion);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }


  // Contactamos
  public sendEmail(e: Event) {
    e.preventDefault();
  
    const buttonContact = document.getElementById('buttonContact') as HTMLButtonElement;
    const originalButtonText = buttonContact.innerText;
  
    // Cambiar el texto del botón a "Enviando..."
    buttonContact.innerText = 'Enviando...';
  
    emailjs.sendForm('default_service', 'template_93d0vhr', e.target as HTMLFormElement, 'q3M13USp5tT7ZFbg_')
      .then((result: EmailJSResponseStatus) => {
        Swal.fire({
          title: 'Correo Enviado',
          text: 'El correo se ha enviado exitosamente.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
        console.log(result.text);
        // Obtener referencia al campo de texto y borrar su contenido
        const messageTextarea = document.getElementById('message') as HTMLTextAreaElement;
        messageTextarea.value = '';
  
        // Restaurar el texto original del botón después de completar el envío
        buttonContact.innerText = originalButtonText;
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al enviar el correo. Por favor, inténtalo nuevamente.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
        console.log(error.text);
  
        // Restaurar el texto original del botón en caso de error
        buttonContact.innerText = originalButtonText;
      });
  }
  
  
}
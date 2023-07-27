import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
// import { AuthLoginService } from '../../services/auth-login.service';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AuthservicesService } from '../../Services/authservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./CSS/buttonGoogle.css','./CSS/buttonAceeder.css']
})
export class LoginComponent implements OnInit, AfterViewInit{
  email: string = '';
  tipoUsuario: string;

 password: string = '';
 nameUser: string = '';

 constructor(private auth: AuthservicesService) { 

    this.tipoUsuario = '';

  }

  ngOnInit(): void {
    // Coloca cualquier lógica de inicialización necesaria aquí
  }
  register()
  {
    if (this.nameUser == '') {
      this.espacioenblancosNombre();
      return;
    }
    if (this.email == '') {
     this.espacioenblancosEmail();
      return;
    }
    if (this.password == '') {
      this.espacioenblancoscontrasena();
      return;
    }
    if (this.password.length < 6) {
      this.cantidadCaracteresPassword();
      return;
    }

    this.auth.register(this.nameUser,this.email, this.password);
    this.nameUser = '';
    this.email = '';
    this.password = '';
  }

  login()
  {
    if (this.email == '') {
      alert('Ingresa Email');
      return;
    }
    if (this.password == '') {
      alert('Ingresa password');
      return;
    }

    // this.auth.login(this.email, this.password);
    // this.email = '';
    // this.password = '';
  }
  // Alertas 


  espacioenblancoscontrasena(){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Ingrese la contraseña!",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido!'
    })
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
  espacioenblancosEmail(){
    Swal.fire({
      title: '¿Está seguro?',
      text: "Ingrese el Email!",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido!'
    })
  }
  cantidadCaracteresPassword(){
    Swal.fire({
      title: '¿Está seguro?',
      text: "La contraseña debe tener al menos 6 caracteres",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido!'
    })
  }



  // Codio JS
  ////////////////////////////////////////////////////////////////
  // Agrega una referencia a los elementos del DOM que deseas usar en el JavaScript
  @ViewChild('signUp') signUpBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('signIn') signInBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;

  // Implementa el código JavaScript en el método ngAfterViewInit
  ngAfterViewInit() {
    this.signUpBtn.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.add('right-panel-active');
    });

    this.signInBtn.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.remove('right-panel-active');
    });
  }

}

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

 password: string = '';


 nameUser: string = '';
 emailRegister: string = '';

passwordRegister: string = '';

 constructor(private auth: AuthservicesService) { 


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
    if (this.emailRegister == '') {
     this.espacioenblancosEmail();
      return;
    }
    if (this.passwordRegister == '') {
      this.espacioenblancoscontrasena();
      return;
    }
    if (this.password.length < 6) {
      this.cantidadCaracteresPassword();
      return;
    }
    if (!this.emailValido(this.emailRegister)) {
      this.formatoEmailInvalido();
      return;
    }

    this.auth.register(this.nameUser,this.emailRegister, this.passwordRegister);
    this.nameUser = '';
    this.emailRegister = '';
    this.passwordRegister = '';
  }

  login()
  {
    if (this.email == '') {
      this.espacioenblancosEmail();
      return;
    }
    if (this.password == '') {
     this.espacioenblancoscontrasena();
      return;
    }
    if (!this.emailValido(this.email)) {
      this.formatoEmailInvalido();
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }



  //GEOOGLE
  signInWithGeoogle()
  {
    this.auth.googleSignIn();
  }

  //Control de Sintaxis Email

  emailValido(tipoemail:string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(tipoemail);
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
  formatoEmailInvalido() {
    Swal.fire({
      title: 'Formato de email inválido',
      text: 'Por favor, ingrese un email válido.',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido!'
    });
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

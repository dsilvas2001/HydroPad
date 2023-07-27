import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Firestore,collection } from '@angular/fire/firestore';


import Swal from 'sweetalert2';
import { addDoc } from 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  constructor(private fireauth:AngularFireAuth, private router:Router) {}

  // Metodo Login

  login(email:string, password:string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token','true');
     

      if(res.user?.emailVerified == true) {
        Swal.fire({
          title: 'Iniciar Sesion exitoso!',
          text: 'El usuario ha ingresado exitosamente.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/pageprincipal/page-home']);
      } else 
      {
        this.router.navigate(['/login']);

      }

    },err=>{
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }

  //Registrar Metodo
  register(nombreUser: string, email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      this.sendEmailForVerification(res.user);
      this.router.navigate(['auth/login']);

    }, err => {
      // Mensaje de error en Swal alert
      Swal.fire({
        title: 'Error de registro',
        text: 'Ha ocurrido un error durante el registro: ' + err.message,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido!'
      });
      this.router.navigate(['auth/login']);
    });
  }

  sendEmailForVerification( user : any)
  {
    user.sendEmailVerification().then((res : any) => {
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'El usuario ha sido registrado exitosamente.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });

    }), (err : any) => {

      Swal.fire({
        title: 'Error de registro',
        text: 'Algo salió mal. No se puede enviar un correo electrónico a su correo electrónico' + err.message,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido!'
      })
    }
  }



  


  





//Registrar Usuario

// Función para guardar el nombre del usuario en Firestore
// private saveUserNameToFirestore(userId: string, nombreUser: string) {
//   const userRef = collection(this.firestore, 'userhydropad'); // Referencia a la colección "userhydropad"

//   // Agrega los datos del usuario al documento
//   addDoc(userRef, {
//     userId: userId,
//     nombre: nombreUser,
//     emailVerified: false // Puedes agregar más información del usuario aquí si lo deseas.
//   })
//   .then(() => {
//     console.log('Nombre de usuario guardado exitosamente en Firestore.');
//   })
//   .catch(error => {
//     console.error('Error al guardar el nombre de usuario en Firestore:', error);
//   });
// }





  forgotPassword(email:string)
  {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      Swal.fire({
        title: '¿Está seguro?',
        text: "Ingrese la contraseña!",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido!'
      })
    }, err => {
      Swal.fire({
        title: 'Error de registro',
        text: 'Algo salió mal ',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido!'
      });
    }
    );
  }

  








   





  // Salir 



  
  
  



  logout() {
    this.fireauth.signOut().then(
      () =>
      {
        localStorage.removeItem('token')
        ;
        this.router.navigate(['auth/login']);
      }, err=>{
        alert(err.message);
      }
    )
  }




}

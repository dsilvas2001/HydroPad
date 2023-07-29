import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';

import { GoogleAuthProvider } from "firebase/auth";


import Swal from 'sweetalert2';

import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { getDocs, getFirestore, query, where } from 'firebase/firestore';





@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {

  constructor(private fireauth:AngularFireAuth, private router:Router,private firestore: Firestore) {}

  // Metodo Login

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      if (res.user?.emailVerified === true) {
        localStorage.setItem('tokenHydropad', res.user.uid);
  
        Swal.fire({
          title: 'Inicio de Sesión Exitoso',
          text: 'El usuario ha ingresado exitosamente.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
  
        this.router.navigate(['/pageprincipal/page-home']);

      } else {
        Swal.fire({
          title: 'Error en el Inicio de Sesión',
          text: 'El correo electrónico aún no ha sido verificado. Por favor, verifica tu correo electrónico antes de iniciar sesión.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
      }
    }, err => {
      Swal.fire({
        title: 'Error en el Inicio de Sesión',
        text: 'Las credenciales ingresadas no son válidas. Por favor, verifica tus datos e inténtalo nuevamente.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      });
      this.router.navigate(['/auth/login']);
    });
  }
  

  //Registrar Metodo
  // register(nombreUser: string, email: string, password: string) {
  //   this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
  //     this.sendEmailForVerification(res.user);
  //     this.router.navigate(['auth/login']);

  //   }, err => {
  //     // Mensaje de error en Swal alert
  //     Swal.fire({
  //       title: 'Error de registro',
  //       text: 'Ha ocurrido un error durante el registro: ' + err.message,
  //       icon: 'error',
  //       confirmButtonColor: '#3085d6',
  //       confirmButtonText: 'Entendido!'
  //     });
  //     this.router.navigate(['auth/login']);
  //   });
  // }

  // sendEmailForVerification( user : any)
  // {
  //   user.sendEmailVerification().then((res : any) => {
  //     Swal.fire({
  //       title: '¡Verifique Su Email!',
  //       text: 'La verificacion ha enviado sido enviada corractamente a su Email.',
  //       icon: 'success',
  //       confirmButtonColor: '#3085d6',
  //       confirmButtonText: 'Aceptar'
  //     });

  //   }), (err : any) => {

  //     Swal.fire({
  //       title: 'Error de registro',
  //       text: 'Algo salió mal. No se puede enviar un correo electrónico a su correo electrónico' + err.message,
  //       icon: 'error',
  //       confirmButtonColor: '#3085d6',
  //       confirmButtonText: 'Entendido!'
  //     })
  //   }
  // }

  register(nombreUser: string, email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      if (res.user) {
        // Registro exitoso
        this.saveUserNameToFirestore(res.user.uid, nombreUser); // Agregamos el nombre del usuario a Firestore
        this.router.navigate(['auth/login']);
      this.sendEmailForVerification(res.user);
} else {
        // En caso de que res.user sea null (registro no exitoso)
        Swal.fire({
          title: 'Error de registro',
          text: 'Ha ocurrido un error durante el registro.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Entendido!'
        });
        this.router.navigate(['auth/login']);
      }
    }).catch(err => {
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

  private saveUserNameToFirestore(userId: string, nombreUser: string) {
    const userCollection = collection(this.firestore, 'userhydropad'); // Utiliza 'collection' de firebase
  
    // Agrega los datos del usuario al documento
    addDoc(userCollection, { // Utiliza 'addDoc' de firebase
      userId: userId,
      nombre: nombreUser,
    })
    .then(() => {
      console.log('Nombre de usuario guardado exitosamente en Firestore.');
    })
    .catch(error => {
      console.error('Error al guardar el nombre de usuario en Firestore:', error);
    });
  }

  sendEmailForVerification( user : any)
  {
    user.sendEmailVerification().then((res : any) => {
      Swal.fire({
        title: '¡Verifique Su Email!',
        text: 'La verificacion ha enviado sido enviada corractamente a su Email.',
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




  //GEOOGLE SIGN IN
  // googleSignIn()
  // {
  //   return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
  //     this.router.navigate(['/pageprincipal/page-home']);
  //     console.log( JSON.stringify(res.user?.uid));

  //     localStorage.setItem('token', JSON.stringify(res.user?.uid));

  //   }, err =>
  //   {
  //     Swal.fire({
  //       title: 'Error al Iniciar Sesion con GOOGLE',
  //       text: 'Ha ocurrido un error durante el sign in: ',
  //       icon: 'error',
  //       confirmButtonColor: '#3085d6',
  //       confirmButtonText: 'Entendido!'
  //     });
  //   }
  //   );
  // }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      this.router.navigate(['/pageprincipal/page-home']);
      console.log(JSON.stringify(res.user?.uid));
  
      const userId = res.user?.uid; // Obtener el UID del usuario de Google
      const userName = res.user?.displayName; // Obtener el nombre del usuario de Google (si está disponible)
  
      if (userId && userName) {
        this.saveUserNameToFirestoreGOOGLE(userId, userName); // Guardar el nombre del usuario y el UID en Firestore
      }
  
      localStorage.setItem('token', JSON.stringify(userId));
  
    }).catch(err => {
      Swal.fire({
        title: 'Error al Iniciar Sesión con GOOGLE',
        text: 'Ha ocurrido un error durante el inicio de sesión.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido!'
      });
    });
  }
  
  private saveUserNameToFirestoreGOOGLE(userId: string, userName: string) {
    const userCollection = collection(this.firestore, 'userhydropad');
  
    // Comprobar si el usuario ya existe en Firestore
    const q = query(userCollection, where('userId', '==', userId));
  
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        // Si el usuario no existe, agregarlo a Firestore
        addDoc(userCollection, {
          userId: userId,
          nombre: userName,
        }).then(() => {
          console.log('Nombre de usuario guardado exitosamente en Firestore.');
        }).catch(error => {
          console.error('Error al guardar el nombre de usuario en Firestore:', error);
        });
      } else {
        console.log('El usuario ya existe en Firestore.');
      }
    }).catch(error => {
      console.error('Error al buscar el usuario en Firestore:', error);
    });
  }
  
  
  


  //Forgot Password
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

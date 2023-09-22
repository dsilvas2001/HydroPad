import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';

import { GoogleAuthProvider } from "firebase/auth";


import Swal from 'sweetalert2';

import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { getDocs, getFirestore, query, where } from 'firebase/firestore';
import { BackuserService } from 'src/app/BackupPgAdmin/ServicesBack/backuser.service';
import { Observable, of } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { Usuario } from 'src/app/models/usermodels';
import { UserfiretoolsService } from 'src/app/serverFirebaseTools/userfiretools.service';
import { UserefreshService } from 'src/app/pagina-user/userservices/userefresh.service';


@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {
  
  usuario: Usuario
  constructor(private fireauth:AngularFireAuth, private router:Router,private firestore: Firestore,private backupuser: BackuserService,private userProfileService: UserfiretoolsService,private userService: UserefreshService) {
    this.usuario = {
      userId: '',
      nombre: '',
      email: ''
    };
  }

  // State Token

  // readonly authState$ = authState(this.auth);

  getAuthToken(): boolean 
  {
    const user = localStorage.getItem('tokenHydropad');
    return user ? true : false;
  }

  // Metodo Login

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      if (res.user?.emailVerified === true) {
        // localStorage.setItem('tokenHydropad', res.user.uid);

        res.user?.getIdToken().then(token => {
          if (token) {
            localStorage.setItem('tokenHydropad', token);
            this.returnDateUser();
          }
        });
        Swal.fire({
          title: 'Inicio de Sesión Exitoso',
          text: 'El usuario ha ingresado exitosamente.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
  
        this.router.navigate(['/pagina-user/HomeUser']);

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

 



  register(nombreUser: string, email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      if (res.user) {
        // Registro exitoso
        this.saveUserNameToFirestore(res.user.uid, nombreUser,email); // Agregamos el nombre del usuario a Firestore
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

  private saveUserNameToFirestore(userId: string, nombreUser: string, emailUser: string) {
    const userCollection = collection(this.firestore, 'userhydropad'); // Utiliza 'collection' de firebase
  
    // Crea un objeto user para simplificar
    const newUser = {
      userId: userId,
      nombre: nombreUser,
      email: emailUser
    };
  
    // Agrega los datos del usuario al documento en Firestore
    addDoc(userCollection, newUser)
      .then(() => {
        console.log('Nombre de usuario guardado exitosamente en Firestore.');

        // Si fue exitoso, guarda en la base de datos de respaldo
        this.backupRegister(newUser);
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
        text: 'La verificacion ha  sido enviada corractamente a su Email.',
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

  backupRegister(newUser:any)
  {
    console.log("método" +  newUser);
    this.backupuser.saveUser(newUser).subscribe(response => {
      console.log("Usuario guardado en la base de respaldo", response);
    }, error => {
      console.error("Error guardando en la base de respaldo", error);
    });
  }

  // GOOGLE
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {

      res.user?.getIdToken().then(token => {
        if (token) {
          localStorage.setItem('tokenHydropad', token);
        }
      });
      const userId = res.user?.uid; // Obtener el UID del usuario de Google
      const userName = res.user?.displayName; // Obtener el nombre del usuario de Google (si está disponible)
      const emailUser = res.user?.email; // Obtener el nombre del usuario de Google (si está disponible)

      if (userId && userName && emailUser) {
        this.saveUserNameToFirestoreGOOGLE(userId, userName,emailUser); // Guardar el nombre del usuario y el UID en Firestore
      }
      // localStorage.setItem('tokenHydropad', JSON.stringify(userId));
  
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
  
  private saveUserNameToFirestoreGOOGLE(userId: string, userName: string, emailUser:string) {
    const userCollection = collection(this.firestore, 'userhydropad');
  
    // Comprobar si el usuario ya existe en Firestore
    const queryCollection = query(userCollection, where('userId', '==', userId));
  
    getDocs(queryCollection).then((querySnapshot) => {

      if (querySnapshot.size === 0) {
        // Si el usuario no existe, agregarlo a Firestore
        const newUser = {
          userId: userId,
          nombre: userName,
          email:emailUser
        }
        console.log("GOOGLE" + userId + userName + emailUser);
          this.backupRegister(newUser);
        
        addDoc(userCollection, newUser).then(() => {
          this.returnDateUser();
          console.log('Nombre de usuario guardado exitosamente en Firestore.');
        }).catch(error => {
          console.error('Error al guardar el nombre de usuario en Firestore:', error);
        });
      } else {
        console.log('El usuario ya existe en Firestore.');
      }
      this.router.navigate(['/pagina-user/HomeUser']);
    }).catch(error => {
      console.error('Error al buscar el usuario en Firestore:', error);
    });
  }
  
  returnDateUser()
  {
    this.userProfileService.ensureUserDataLoaded().subscribe();
    this.userService.currentUser.subscribe(user => {
      this.usuario = user;
    }); 
  }
  
  


  //Forgot Password
  forgotPassword(email: string) {
    return this.fireauth.sendPasswordResetEmail(email);
  }

  // Salir 
  logout() {
    this.fireauth.signOut().then(
      () =>
      {
        localStorage.removeItem('tokenHydropad')
        ;
        this.router.navigate(['auth/login']);
      }, err=>{
        alert(err.message);
      }
    )
  }




}

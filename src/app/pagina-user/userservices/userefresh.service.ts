import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/models/usermodels';

@Injectable({
  providedIn: 'root'
})
export class UserefreshService {
  // private userSource = new BehaviorSubject<Usuario>({
  //   userId: '',
  //   nombre: '',
  //   email: ''
  // });

  // currentUser = this.userSource.asObservable();

  // constructor() {}

  // updateUser(user: Usuario) {
  //   this.userSource.next(user);
  // }


  private userSource = new BehaviorSubject<Usuario>({
    userId: '',
    nombre: '',
    email: ''
  });

  currentUser = this.userSource.asObservable();

  constructor() {}

  updateUser(user: Usuario) {
    this.userSource.next(user);
  }

  getUserData(): Usuario {
    return this.userSource.getValue();
  }

  isUserDataLoaded(): boolean {
    // En este ejemplo, asumimos que el nombre no será una cadena vacía si los datos están cargados.
    // Si necesitas una verificación más robusta, puedes ajustar esta condición.
    return this.userSource.getValue().nombre !== '';
  }
  clearUserData() {
    this.userSource.next({
      userId: '',
      nombre: '',
      email: ''
    });
  }





}

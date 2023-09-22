import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../models/usermodels';
import { UserefreshService } from '../pagina-user/userservices/userefresh.service';

import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserfiretoolsService {
  private baseUrl = 'http://localhost:8080/firebase'; // Cambia a la URL correcta de tu backend
  private baseUrlUser = 'http://localhost:8080/userHydropad'; // Cambia a la URL correcta de tu backend

  constructor(private http: HttpClient, private userDataService: UserefreshService) {}

  retrieveUserData(): Observable<Usuario> {
    const token = localStorage.getItem('tokenHydropad');

    if (!token) {
      return of({success: false, error: 'Token no encontrado en localStorage.',} as any);
    }

    const headers = new HttpHeaders({
      Authorization: token,
    });

    return this.http.get<Usuario>(`${this.baseUrl}/retrieveUser`, {
      headers: headers,
    });
  }

  // updateUser(userId: string, post: Usuario): Observable<any> {
  //   const url = `${this.baseUrlUser}/${userId}/update`;
  //   return this.http.put(url, post);
  // }

  updateUserName(userId: string, newName: string): Observable<any> {
    const url = `${this.baseUrlUser}/${userId}/update`;
    return this.http.put(url, { nombre: newName });
}

ensureUserDataLoaded(): Observable<Usuario> {
  if (this.userDataService.isUserDataLoaded()) {
    return of(this.userDataService.getUserData());
  }

  return this.retrieveUserData().pipe(
    tap((data: Usuario) => this.userDataService.updateUser(data))
  );
}



}

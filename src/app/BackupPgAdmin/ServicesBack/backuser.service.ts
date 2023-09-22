import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BackuserService {

  private baseUrl: string = 'http://localhost:8081/userHydropad';
  constructor(private http:HttpClient) { 
  }
  // Método para obtener un usuario por ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Método para guardar un nuevo usuario
  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, user);
  }
  // Método para actualizar un usuario
  // updateUser(id: number, user: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${id}/update`, user);
  // }


  updateUser(userId: string, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateName/${userId}`, user);
  }
  
  // Método para eliminar un usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/delete`);
  }
}

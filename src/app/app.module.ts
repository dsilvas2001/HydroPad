import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore,getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/pages/login/login.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

 // aquí se importa FormsModule


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
    
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
  //   provideAuth(() => 
  //   {
  //     const auth = getAuth();
  //     connectAuthEmulator(auth,'http://localhost:9099',{disableWarnings: true}); 
  //     return auth;
  //   // initializeApp(environment.firebase)
  // }
  // ),
  //   provideFirestore(() => {
  //     const firestore = getFirestore();
  //     connectFirestoreEmulator(firestore,'http://localhost',9098);
  //     return firestore;
  //   }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
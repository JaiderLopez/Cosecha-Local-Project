import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { getFirestore } from "firebase/firestore";
import { initializeApp} from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCGB8iMhvyHx-ZCUDKLpADq7cBqZp0xBlk",
  authDomain: "cosecha-local-95669.firebaseapp.com",
  projectId: "cosecha-local-95669",
  storageBucket: "cosecha-local-95669.appspot.com",
  messagingSenderId: "138140106960",
  appId: "1:138140106960:web:984a65eb3269dfaf0d5ed5",
  measurementId: "G-62EV3079BX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), HttpClientModule,
    
  ]
  
};

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getAuth as getAuth_alias, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// Initialize Firebase
const app = initializeApp(environment.firebase);
const db = getFirestore(app);
const auth = getAuth(app);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), HttpClientModule, importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"cosechadb","appId":"1:555429064872:web:10a2ef3f46fc90b71c529d","storageBucket":"cosechadb.appspot.com","apiKey":"AIzaSyB3rHKKAorA0oWgdpUpHqTG1Yh9_Chj2oQ","authDomain":"cosechadb.firebaseapp.com","messagingSenderId":"555429064872","measurementId":"G-2YX8BP8C6D"}))), importProvidersFrom(provideAuth(() => getAuth())),
    
  ]
  
};

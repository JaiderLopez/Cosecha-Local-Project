import { Injectable, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth"
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updateEmail, updateProfile } from "firebase/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "../user"
import { Firestore, collection, collectionData, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { updateDoc } from "firebase/firestore";
@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor (private auth: Auth, private firestore: Firestore) {
        
    }

    user$ = user(this.auth)
    currentUserSig = signal<UserInterface | null | undefined>(undefined)

    toRegister(name: string, email: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.auth, email, password)
            .then(response => {
                updateProfile(response.user, {displayName: name});
                setDoc(doc(collection(this.firestore, "usuarios"),response.user.uid), {
                    ID : response.user.uid, username: name, email: email, password: password
                });
            });
        return from(promise)
    }
    toLogin(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(this.auth,email,password)
            .then(() => {})
        return from(promise);
        /*return signInWithEmailAndPassword(this.auth, email, password);*/
    }
    toLogOut(): Observable<void>{
        const promise = signOut(this.auth);
        return from(promise);
    }
    
    async getByID(id:string){
        const docRef = doc(this.firestore, 'usuarios', id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()){
            console.log("No such document!");
        }
        return docSnap.data() as UserInterface;
    }
    
    async update(user: any, password: string) {
        //update en fire auth
        const auth = getAuth();
        var nameAux, photoAux = "";
        if (user.name == ""){
            nameAux = auth.currentUser.displayName;
        } else {
            nameAux = user.name;
        }
        if (user.photoURL == ""){
            photoAux = auth.currentUser.photoURL;
        } else {
            photoAux = user.photoURL;
        }

        updateProfile(auth.currentUser, {
            displayName: nameAux, photoURL: user.photoURL
          }).then(() => {

          }).catch((error) => {
            console.error(error);
        });

        if (password !== ""){
            await signInWithEmailAndPassword(auth, auth.currentUser.email, password).then(() => {
                updateEmail(auth.currentUser, user.email).then(() => {
                    console.log("email confirmado");
                }).catch((error) => {
                    console.error(error);
                });
                console.log("Profile updated!");
            }).catch((error) => {
                console.error(error);
            });
        }

        //update en firestore
        
        console.log(user.photoURL);
        const ref = doc(this.firestore, "usuarios", user.ID);
        if(user.username != ""){await updateDoc(ref, {username: user.username});}
        if(user.email != ""){await updateDoc(ref, {email: user.email});}
        if(user.sexo != ""){await updateDoc(ref, {sexo: user.sexo});}
        if(user.info != ""){await updateDoc(ref, {info: user.info});}
        if(user.photoURL != ""){await updateDoc(ref, {photoURL: user.photoURL});}
        if(user.fecha != ""){await updateDoc(ref, {fecha: user.fecha});}
        if(user.telefono != ""){await updateDoc(ref, {telefono: user.telefono});}
        if(user.direccion != ""){await updateDoc(ref, {direccion: user.direccion});}
    }
}

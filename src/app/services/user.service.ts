import { Injectable, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth"
import { updateProfile } from "firebase/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "../user"
import { Firestore, collection, collectionData, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { ProductItemComponent } from "../components/main/buy/product-item/product-item.component";
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
                updateProfile(response.user, {displayName: name})
                setDoc(doc(collection(this.firestore, "usuarios"),response.user.uid), {
                    ID : response.user.uid, username: name, email: email, password: password
                })
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
}
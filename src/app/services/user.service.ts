import { Injectable, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth"
import { updateProfile } from "firebase/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "../user"
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor (private auth: Auth) {
        
    }

    user$ = user(this.auth)
    currentUserSig = signal<UserInterface | null | undefined>(undefined)

    toRegister(name: string, email: string, password: string): Observable<void> {
        const promise = createUserWithEmailAndPassword(this.auth, email, password)
            .then(response => updateProfile(response.user, {displayName: name}));
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
}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService {
    constructor (private userService: UserService, private route: ActivatedRoute, private router: Router) {}
    getAuthToken():Observable<boolean> {
        const auth = getAuth();
        var value;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                value = of(true);
            } else {
                this.router.navigate(['/login'], { relativeTo: this.route });
                value = of(false);
            }
        });
        return value;
    }
}
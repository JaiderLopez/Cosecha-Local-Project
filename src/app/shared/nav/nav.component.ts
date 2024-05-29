import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../components/user/login/login.component';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.userService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.userService.currentUserSig.set(null);
      }
      console.log(this.userService.currentUserSig());
    })
  }

  logOut(){
    this.userService.toLogOut();
    this.router.navigate(['/home/landing'], { relativeTo: this.route });
  }
}

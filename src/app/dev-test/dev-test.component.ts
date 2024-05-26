import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dev-test',
  standalone: true,
  imports: [],
  templateUrl: './dev-test.component.html',
  styleUrl: './dev-test.component.css'
})
export class DevTestComponent {
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  
  logOut(){
    this.userService.toLogOut();
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
  
}

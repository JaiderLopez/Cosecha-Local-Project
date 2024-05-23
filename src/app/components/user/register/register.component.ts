import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink,} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, LoginComponent,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  goToItems() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
}

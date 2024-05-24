import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink,} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, LoginComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  applyForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService ) {}

  goToItems() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
  onSubmit() {
    this.userService.toRegister(this.applyForm.value)
      .then(response => {
        this.router.navigate(['/home/buy'], { relativeTo: this.route });
      })
      .catch(error => console.log(error));
  }
}

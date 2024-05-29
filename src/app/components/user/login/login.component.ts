import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  goToItems() {
    this.router.navigate(['/register'], { relativeTo: this.route });
  }
  onSubmit(){
    const rawForm = this.applyForm.getRawValue();
    this.userService.toLogin(rawForm.email,rawForm.password)
      .subscribe(() => {
        this.router.navigate(['/home/buy'], { relativeTo: this.route });
      });
  }
}